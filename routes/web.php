<?php

use App\Http\Controllers\GateController;
use App\Http\Controllers\SearchController;
use App\Http\Middleware\RequireGate;
use Illuminate\Support\Facades\Route;

/*
 * The whole application is four routes: a page, a search proxy, and the unlock
 * form. Everything else the demo does happens in the browser.
 */

Route::get('/', function () {
    return view('demo', [
        'catalogues' => config('metasearch.catalogues'),
    ]);
})->middleware(RequireGate::class)->name('demo');

/*
 * The search proxy.
 *
 * Gate first, throttle second, and the order is deliberate: an unauthenticated
 * flood should cost a session lookup rather than a rate-limiter write, and
 * metering locked-out traffic would let a stranger fill a legitimate partner's
 * bucket. Past the gate, the throttle bounds what one caller can do.
 */
Route::get('/api/search', SearchController::class)
    ->middleware([RequireGate::class, 'throttle:metasearch'])
    ->name('api.search');

/*
 * The gate itself is excluded from RequireGate for the obvious reason: it is
 * how someone gets past it in the first place.
 */
Route::get('/gate', [GateController::class, 'show'])->name('gate.show');
Route::post('/gate', [GateController::class, 'unlock'])->name('gate.unlock');
