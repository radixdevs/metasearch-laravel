# MetaSearch Demo — Laravel 12 / PHP 8.4

A partner-facing demo of Radix's MetaSearch domain API. One page, one search
proxy. Public — no login.

Built and verified on **PHP 8.4.24** with **Laravel 12.68**.

## Why there is a backend at all

The demo needs three live MetaSearch API tokens, and a token must never reach
the browser — anyone could read it from view-source and spend Radix's quota. So
the request path is:

```
browser  ->  this app (attaches the token)  ->  metasearch.namify.host
```

That single fact drives most of the design here. A static site cannot do it.

It also means `/api/search` is a credentialed endpoint, and this app serves it
**publicly and unauthenticated by design**. Anyone with the URL can search
through it, and every search spends Radix quota under our token.

That is a deliberate trade, not an oversight: the demo has to open without a
password, and the token itself never reaches the browser, which is the part that
actually matters. The per-IP rate limit is the only thing bounding how fast a
stranger can use the endpoint. If it is ever found and abused, rotating the
three tokens is the remedy.

## Running it

```bash
composer install
cp .env.example .env
php artisan key:generate
# then set the three METASEARCH_TOKEN_* values in .env
php artisan serve
```

Point the web root at `public/`. **No database is required** — session, cache
and queue all run without one, so there is nothing to provision and no
migrations to run.

## Configuration

Everything lives in `.env`; see `.env.example` for the annotated list. The ones
that matter:

| Variable | Required | Purpose |
| --- | --- | --- |
| `METASEARCH_TOKEN_RADIX` | yes | Bearer token for the Radix Domains catalogue |
| `METASEARCH_TOKEN_CLASSICS` | yes | Radix + Classics |
| `METASEARCH_TOKEN_FULLCAT` | yes | Full Catalogue |
| `METASEARCH_RATE_LIMIT` | no (default `20`) | Searches per minute per IP |

Tuning lives in `config/metasearch.php` — catalogue TLD lists, the upstream URL,
timeout, and rate limit.

## Deployment notes

**HTTPS.** Nothing here breaks without it — the app is stateless and holds no
cookie worth protecting — but serve over HTTPS anyway. Partners will be looking
at it.

**Reverse proxy.** If nginx or Apache sits in front, forward `X-Forwarded-Proto`
and configure Laravel's `TrustProxies`, so generated URLs use the right scheme.

**No database.** `DB_CONNECTION=null`, sessions are `array`, cache is `file`,
queue is `sync`. There is nothing to migrate and nothing to provision.

**Rate limiting** is keyed by IP through the file cache. On one long-running
server that is an accurate global count. It is the ONLY protection on the
endpoint, so if the demo ever needs to be locked down, this and token rotation
are the levers.

## Shape of the code

```
routes/web.php                           two routes, that is the whole app
config/metasearch.php                    tokens, catalogues, limits
app/Http/Controllers/SearchController     the proxy — attaches the token
resources/views/demo.blade.php            the page (generated, see below)
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
| 429 | `rate_limited` | past the per-IP limit |
| 500 | `server_misconfigured` | that catalogue's token is not set |
| 502 | `upstream_unreachable` | could not reach the API |
| 504 | `upstream_timeout` | API did not answer within the timeout |

## Known upstream issues

Not bugs in this app — they are with the API and are tracked separately.

1. **The Classics catalogue returns 8 extensions, not the 14 specified.** The 8
   are exactly the pre-24-August list, so the spec change never reached the API
   config. `config/metasearch.php` carries the intended 14.
2. **A domain typed explicitly disappears when taken, on the hero extension
   only.** `namify.press` comes back marked unavailable; `namify.store` does not
   come back at all. Every non-hero extension behaves correctly.
