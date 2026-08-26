<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /*
         * Rate limit for the search proxy. A brake on scripted abuse, not a
         * quota — the numbers are tuned for a person flipping switches while
         * reading results, which is bursty, and the demo doubles its requests
         * whenever AI suggestions are on because those are fetched separately
         * so they cannot block the main results.
         *
         * Keyed by IP. On a single long-running server this is an accurate
         * global count; the same limiter on serverless would have given every
         * instance its own counter and meant very little.
         */
        RateLimiter::for('metasearch', function (Request $request) {
            return Limit::perMinute(config('metasearch.rate_limit'))
                ->by($request->ip())
                ->response(function () {
                    return response()->json(['error' => 'rate_limited'], 429);
                });
        });
    }
}
