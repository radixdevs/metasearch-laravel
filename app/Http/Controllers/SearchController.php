<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\ConnectionException;

/**
 * GET /api/search — proxy to the upstream MetaSearch API.
 *
 * The entire reason this endpoint exists is that the bearer token must never
 * reach the browser. The browser asks this app, this app attaches the token and
 * asks the API. A static page cannot do that, which is why the demo needs a
 * server at all.
 *
 * `catalogue` is CONSUMED here rather than forwarded: the upstream has no such
 * parameter and picks the bundle from the credential instead, so this endpoint
 * translates one into the other.
 *
 * Deliberately does NOT forward inbound client headers (Authorization, Cookie,
 * and so on) upstream, and returns no upstream headers beyond content-type.
 * That keeps caller-supplied credentials and upstream infrastructure headers
 * out of the hop in both directions.
 */
class SearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        /*
         * FAIL CLOSED. Tokens present with no gate configured is the one state
         * that must never serve: it is an open proxy in front of credentialed
         * API access. A misconfigured deployment should read as "the demo is
         * down", not as "the demo is unprotected".
         */
        if ($this->gateMisconfigured()) {
            Log::error('[api/search] tokens are set but GATE_PASSWORD is not');

            return $this->json(['error' => 'gate_misconfigured'], 503);
        }

        $catalogue = (string) $request->query('catalogue', '');
        $tokens = config('metasearch.tokens');

        if (! array_key_exists($catalogue, $tokens)) {
            // The client only ever sends one of three; anything else is a caller bug.
            return $this->json(['error' => 'unknown_catalogue'], 400);
        }

        $apiKey = (string) env($tokens[$catalogue], '');

        if ($apiKey === '') {
            // Name the missing variable in the log; keep the client message generic.
            Log::error("[api/search] {$tokens[$catalogue]} is not set");

            return $this->json(['error' => 'server_misconfigured'], 500);
        }

        /*
         * Rebuilt from a whitelist rather than passed through, so exactly the
         * documented parameters reach the upstream and nothing else. This
         * matters more than it looks: the upstream accepts and silently ignores
         * unknown parameters, so anything extra would return 200 with an
         * unchanged body — indistinguishable from being honoured.
         */
        $forwarded = [];
        foreach (config('metasearch.forward_params') as $name) {
            $value = $request->query($name);
            if ($value !== null) {
                $forwarded[$name] = (string) $value;
            }
        }

        try {
            $upstream = Http::withHeaders([
                'authorization' => 'Bearer '.$apiKey,
                'accept' => 'application/json',
            ])
                ->timeout(config('metasearch.timeout'))
                ->get(config('metasearch.url'), $forwarded);
        } catch (ConnectionException $e) {
            /*
             * Laravel raises ConnectionException for both a timeout and an
             * unreachable host, and the two need different copy on screen —
             * "the API did not answer in 25 seconds, try turning AI
             * suggestions off" versus "could not be reached". The message is
             * the only thing that separates them.
             */
            $timedOut = str_contains(strtolower($e->getMessage()), 'timed out')
                || str_contains(strtolower($e->getMessage()), 'timeout');

            Log::error('[api/search] upstream request failed: '.$e->getMessage());

            return $this->json(
                ['error' => $timedOut ? 'upstream_timeout' : 'upstream_unreachable'],
                $timedOut ? 504 : 502,
            );
        }

        /*
         * Upstream status and body pass straight through, so a partner
         * developing against this demo sees the API's real validation errors
         * rather than something this app invented.
         */
        return response(
            $upstream->body(),
            $upstream->status(),
        )->withHeaders([
            'content-type' => $upstream->header('content-type') ?: 'application/json; charset=utf-8',
            'cache-control' => 'no-store',
        ]);
    }

    /** Tokens present but no password set, while the gate is switched on. */
    private function gateMisconfigured(): bool
    {
        if (! config('metasearch.gate.enabled')) {
            return false;
        }

        $anyToken = false;
        foreach (config('metasearch.tokens') as $var) {
            if ((string) env($var, '') !== '') {
                $anyToken = true;
                break;
            }
        }

        return $anyToken && (string) config('metasearch.gate.password', '') === '';
    }

    private function json(array $body, int $status): Response
    {
        return response(json_encode($body), $status)->withHeaders([
            'content-type' => 'application/json; charset=utf-8',
            'cache-control' => 'no-store',
        ]);
    }
}
