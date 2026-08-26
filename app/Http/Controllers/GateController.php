<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\View\View;

/**
 * The unlock page and its form handler.
 *
 * The page is deliberately plain and is the first thing a partner sees, so the
 * copy does the work the design does not: say what this is and where the
 * password came from. An unbranded password box is indistinguishable from a
 * phishing prompt, which is a poor way to open a partner relationship.
 *
 * No JavaScript. A form post works before anything has hydrated and cannot fail
 * halfway.
 */
class GateController extends Controller
{
    public function show(): View|RedirectResponse
    {
        if (! $this->gateActive()) {
            return redirect('/');
        }

        return view('gate');
    }

    public function unlock(Request $request): RedirectResponse
    {
        if (! $this->gateActive()) {
            return redirect('/');
        }

        /*
         * Its own budget, deliberately tighter than search: this is the
         * endpoint worth guessing at, and the search limit is tuned for someone
         * flipping switches while reading results.
         *
         * ONE hit per attempt. An early version of the Node app called the
         * limiter twice in the same condition, silently spending two tokens per
         * try and halving the allowance — the kind of bug that reads as correct
         * and only shows up as "why did it lock me out so fast".
         */
        $key = 'gate:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, maxAttempts: 8)) {
            return back()->with('error', 'throttled');
        }

        RateLimiter::hit($key, decaySeconds: 60);

        $expected = (string) config('metasearch.gate.password', '');
        $submitted = (string) $request->input('password', '');

        /*
         * hash_equals compares in constant time, and hashing first equalises
         * the lengths so the comparison cannot leak how much of the password
         * was right.
         */
        if ($expected === '' || ! hash_equals(hash('sha256', $expected), hash('sha256', $submitted))) {
            return back()->with('error', 'wrong');
        }

        RateLimiter::clear($key);

        /*
         * Rotate the session id on a successful unlock, so a session id an
         * attacker managed to plant beforehand does not become an unlocked one.
         */
        $request->session()->regenerate();
        $request->session()->put('ms_gate', true);

        return redirect('/');
    }

    private function gateActive(): bool
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
