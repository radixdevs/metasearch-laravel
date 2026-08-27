#!/bin/bash
#
# Start the MetaSearch demo locally.
#
#   ./start.sh            → http://localhost:8000
#   ./start.sh 9000       → a different port
#
# Pins PHP 8.4 explicitly. Homebrew installed 8.5 as the default `php`, and the
# app is built and tested against 8.4 — the version the server runs. Relying on
# whatever `php` resolves to is how "works on my laptop" starts.

set -e

PORT="${1:-8000}"
PHP="/opt/homebrew/opt/php@8.4/bin/php"

cd "$(dirname "$0")"

# --- the right PHP -----------------------------------------------------------
if [ ! -x "$PHP" ]; then
  echo "PHP 8.4 not found at $PHP"
  echo "Install it with:  brew install php@8.4"
  exit 1
fi

# --- config that must exist before the server is any use ---------------------
if [ ! -f .env ]; then
  echo "No .env yet — creating one from .env.example"
  cp .env.example .env
  "$PHP" artisan key:generate
  echo
  echo "Now add the three METASEARCH_TOKEN_* values to .env, then run this again."
  exit 1
fi

if ! grep -q "^APP_KEY=base64:" .env; then
  echo "No APP_KEY — generating one"
  "$PHP" artisan key:generate
fi

# Warn rather than fail: the app starts fine without tokens, it just cannot
# search. Better to say so here than to leave someone reading a 500 later.
if ! grep -qE "^METASEARCH_TOKEN_[A-Z]+=.+" .env; then
  echo "WARNING: no METASEARCH_TOKEN_* values in .env — searches will return"
  echo "         server_misconfigured until they are set."
  echo
fi

# --- stale config cache ------------------------------------------------------
# `config:cache` freezes .env into a file, so an edited token is ignored until
# the cache is cleared. Clearing on every start costs milliseconds and removes
# an entire class of "I changed it and nothing happened".
"$PHP" artisan config:clear >/dev/null 2>&1 || true

echo "MetaSearch demo"
echo "  PHP:      $("$PHP" --version | head -1 | cut -d' ' -f1-2)"
echo "  Laravel:  $("$PHP" artisan --version | sed 's/Laravel Framework //')"
echo "  URL:      http://localhost:$PORT"
echo "  Stop:     Ctrl-C"
echo

exec "$PHP" artisan serve --port="$PORT"
