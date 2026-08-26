<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * The access gate.
 *
 * WHAT IT PROTECTS, since this is easy to get backwards: not the page. The page
 * is a public demo and there is nothing secret on it. What it protects is
 * /api/search, which attaches a live Radix credential to every request it
 * makes. Without a gate, anyone holding the URL has a free, unmetered gateway
 * to Radix's API and can spend the quota at any rate they like.
 *
 * WHAT IT IS NOT: user accounts. One shared password for a demo audience, with
 * nothing per-partner to authorise and no data belonging to one partner that
 * another must not see. The job is to keep the endpoint off the open internet,
 * not to identify who is knocking.
 *
 * Session state rather than a hand-rolled signed cookie, because Laravel's
 * session cookie is already signed and encrypted and its handling is far better
 * tested than anything written for this app would be.
 */
class RequireGate
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->gateRequired()) {
            return $next($request);
        }

        if ($request->session()->get('ms_gate') === true) {
            return $next($request);
        }

        /*
         * An API caller gets a status it can act on; a person gets the unlock
         * page. Redirecting a fetch() to an HTML form would surface in the UI
         * as "the response could not be read", which is true and useless.
         */
        if ($request->is('api/*')) {
            return response()->json(['error' => 'gate_locked'], 401);
        }

        return redirect()->route('gate.show');
    }

    /**
     * The gate is required when it is switched on AND there is a credential to
     * protect. A sample-data deployment has nothing to steal and no quota to
     * burn, so gating it would be ceremony.
     *
     * The consequence worth holding onto: adding a token turns the gate ON. It
     * cannot be forgotten separately from the thing it protects.
     */
    private function gateRequired(): bool
    {
        if (! config('metasearch.gate.enabled')) {
            return false;
        }

        foreach (config('metasearch.tokens') as $var) {
            if ((string) env($var, '') !== '') {
                return true;
            }
        }

        return false;
    }
}
