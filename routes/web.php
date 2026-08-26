<?php

use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

/*
 * The whole application is two routes: a page and a search proxy. Everything
 * else the demo does happens in the browser.
 */

Route::get('/', function () {
    return view('demo', [
        'catalogues' => config('metasearch.catalogues'),
    ]);
})->name('demo');

/*
 * The search proxy. PUBLIC AND UNAUTHENTICATED, deliberately.
 *
 * Worth being explicit about what that means, because it is not obvious from
 * reading the route: this endpoint attaches a live Radix credential to every
 * request it makes. Anyone who has the URL can spend the quota through it, and
 * the throttle below is the only thing bounding how fast.
 *
 * That is a considered trade for a partner demo that should open without a
 * password — the credential itself never reaches the browser, which is the part
 * that actually matters. If the endpoint is ever found and abused, rotating the
 * three tokens is the remedy.
 */
Route::get('/api/search', SearchController::class)
    ->middleware('throttle:metasearch')
    ->name('api.search');
