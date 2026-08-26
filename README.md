# MetaSearch Demo — Laravel 12 / PHP 8.4

A partner-facing demo of Radix's MetaSearch domain API. One page, one search
proxy, one password gate.

Built and verified on **PHP 8.4.24** with **Laravel 12.68**.

## Why there is a backend at all

The demo needs three live MetaSearch API tokens, and a token must never reach
the browser — anyone could read it from view-source and spend Radix's quota. So
the request path is:

```
browser  ->  this app (attaches the token)  ->  metasearch.namify.host
```

That single fact drives most of the design here. A static site cannot do it.

It also means `/api/search` is a credentialed endpoint: open it to the internet
and you have given away metered access to Radix's API. That is what the gate
protects. It is not protecting the page — there is nothing secret on the page.

## Running it

```bash
composer install
cp .env.example .env
php artisan key:generate
# then set the three METASEARCH_TOKEN_* values and GATE_PASSWORD in .env
php artisan serve
```

Point the web root at `public/`.

## Configuration

Everything lives in `.env`; see `.env.example` for the annotated list. The five
that matter:

| Variable | Required | Purpose |
| --- | --- | --- |
| `METASEARCH_TOKEN_RADIX` | yes | Bearer token for the Radix Domains catalogue |
| `METASEARCH_TOKEN_CLASSICS` | yes | Radix + Classics |
| `METASEARCH_TOKEN_FULLCAT` | yes | Full Catalogue |
| `GATE_PASSWORD` | yes, if any token is set | The shared password partners are given |
| `GATE_ENABLED` | no (default `true`) | `false` runs `/api/search` public, deliberately |

Tuning lives in `config/metasearch.php` — catalogue TLD lists, the upstream URL,
timeout, and rate limit.

## Deployment notes

**HTTPS.** The gate uses Laravel's session cookie. Serve over HTTPS and set
`SESSION_SECURE_COOKIE=true`. Over plain HTTP on a LAN address a secure cookie
is discarded silently and the login loops back to `/gate` forever with no error
explaining why — worth knowing, because it presents as a broken password.

**Reverse proxy.** If nginx or Apache sits in front, forward the original host:
`X-Forwarded-Host` and `X-Forwarded-Proto`, and configure Laravel's
`TrustProxies` accordingly. Without it the redirect after login points at
localhost.

**Sessions.** The default file driver is fine for a single server. Behind more
than one, move `SESSION_DRIVER` to redis or database, or logins will appear to
fail at random as requests land on different machines.

**Rate limiting** is keyed by IP through Laravel's cache. On one long-running
server that is an accurate global count.

## Shape of the code

```
routes/web.php                           four routes, that is the whole app
config/metasearch.php                    tokens, catalogues, limits
app/Http/Controllers/SearchController     the proxy — attaches the token
app/Http/Controllers/GateController       password -> session
app/Http/Middleware/RequireGate           the gate check
resources/views/demo.blade.php            the page (generated, see below)
resources/views/gate.blade.php            the unlock page
public/assets/app.css, app.js             the front end (generated, see below)
```

### The generated front end

`demo.blade.php`, `app.css` and `app.js` are **generated**, not hand-written.
They come from the framework-free build in the Next.js repo
(`scratchpad/art/build-laravel.mjs`), which is the version that repo's test
suites exercise. Editing them here works until the next regeneration and is then
silently lost.

There is no React, no build step and no Node dependency at runtime — just CSS
and plain JavaScript. The only difference from the static build is where results
come from: `fetch('/api/search')` instead of a bundled sample-data function.

To change the UI, change it in the Next.js repo and regenerate.

## The API endpoint

```
GET /api/search?search_term=coffee&catalogue=classics&autosuggest=true&aisuggest=false
```

`catalogue` is consumed here and never forwarded — the upstream has no such
parameter and picks the bundle from the credential. Everything else is forwarded
by whitelist, because the upstream **accepts and silently ignores unknown
parameters**: a typo returns 200 with an unchanged body, which is
indistinguishable from being honoured.

| Status | Body | Meaning |
| --- | --- | --- |
| 200 | upstream payload | passed through verbatim, including upstream errors |
| 400 | `unknown_catalogue` | not one of the three ids |
| 401 | `gate_locked` | no valid session |
| 429 | `rate_limited` | past the per-IP limit |
| 500 | `server_misconfigured` | that catalogue's token is not set |
| 502 | `upstream_unreachable` | could not reach the API |
| 503 | `gate_misconfigured` | tokens set, no password — refusing to serve |
| 504 | `upstream_timeout` | API did not answer within the timeout |

## Known upstream issues

Not bugs in this app — they are with the API and are tracked separately.

1. **The Classics catalogue returns 8 extensions, not the 14 specified.** The 8
   are exactly the pre-24-August list, so the spec change never reached the API
   config. `config/metasearch.php` carries the intended 14.
2. **A domain typed explicitly disappears when taken, on the hero extension
   only.** `namify.press` comes back marked unavailable; `namify.store` does not
   come back at all. Every non-hero extension behaves correctly.
