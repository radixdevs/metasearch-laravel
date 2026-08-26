<?php

/**
 * MetaSearch API configuration.
 *
 * THE TOKEN IS THE CATALOGUE. The upstream API infers the TLD bundle and the
 * hero TLD from the credential and accepts no catalogue parameter of its own,
 * so this app holds three tokens in order to be able to show all three
 * catalogues — something the demo can do and a partner integration (one token,
 * one catalogue) cannot.
 *
 * Every value here is server-side. None of it reaches the browser.
 */

return [

    'url' => env('METASEARCH_URL', 'https://metasearch.namify.host/v1/search'),

    /*
     * AI suggestions take 8-17 seconds on a cache miss, so the ceiling has to
     * clear that with room to spare or those requests die mid-flight and look
     * like an API fault.
     */
    'timeout' => (int) env('METASEARCH_TIMEOUT', 25),

    /*
     * catalogue id => env var holding its bearer token.
     *
     * The ids are the contract with the front end and must not be renamed:
     * they arrive as the `catalogue` query parameter.
     */
    'tokens' => [
        'radix' => 'METASEARCH_TOKEN_RADIX',
        'classics' => 'METASEARCH_TOKEN_CLASSICS',
        'fullcat_uk_au' => 'METASEARCH_TOKEN_FULLCAT',
    ],

    /*
     * The only query parameters forwarded upstream, by whitelist.
     *
     * Whitelisted rather than passed through because the upstream ACCEPTS AND
     * SILENTLY IGNORES unknown parameters — verified against the live service.
     * A typo'd or invented parameter therefore returns 200 with an unchanged
     * body, which is indistinguishable from being honoured. `catalogue` is
     * consumed by this app and must never travel.
     */
    'forward_params' => ['search_term', 'autosuggest', 'aisuggest'],

    /*
     * Catalogue display data, used to render the page. The TLD lists are what
     * the catalogue is SPECIFIED to carry; the live API currently serves 8 for
     * classics rather than 14, which is an upstream config issue and not
     * something to correct here.
     */
    'catalogues' => [
        'radix' => [
            'label' => 'Radix Domains',
            'hero_tld' => 'store',
            'tlds' => ['store', 'tech', 'online', 'site', 'website', 'space', 'fun', 'uno', 'press', 'pw', 'host'],
        ],
        'classics' => [
            'label' => 'Radix + Classics',
            'hero_tld' => 'tech',
            'tlds' => ['store', 'tech', 'online', 'site', 'website', 'space', 'fun', 'uno', 'press', 'pw', 'host', 'com', 'net', 'org'],
        ],
        'fullcat_uk_au' => [
            'label' => 'Full Catalogue',
            'hero_tld' => 'site',
            'tlds' => [
                'store', 'tech', 'online', 'site', 'website', 'space', 'fun', 'uno', 'press', 'pw', 'host',
                'com', 'net', 'org', 'ai', 'io', 'co', 'app', 'dev',
                'uk', 'eu', 'de', 'au', 'fr', 'ca', 'nl', 'it',
            ],
        ],
    ],

    /*
     * ACCESS GATE.
     *
     * Required whenever any token above is set. The app refuses to serve in
     * that state rather than falling back to open, because an open endpoint
     * with credentials attached is a free gateway to Radix's API for anyone who
     * finds the URL — the page is not the sensitive thing, the tokens are.
     *
     * Set GATE_ENABLED=false to run the endpoint public deliberately. Rate
     * limiting still applies. That is a legitimate choice for a demo, but it
     * has to be made on purpose rather than by forgetting a variable.
     */
    'gate' => [
        'enabled' => env('GATE_ENABLED', true),
        'password' => env('GATE_PASSWORD'),
    ],

    /*
     * Requests per minute per caller, once past the gate. A brake on scripted
     * abuse, not a quota. On a single long-running server this is an accurate
     * global limit — the Node version carried a caveat here because serverless
     * gave each instance its own counter.
     */
    'rate_limit' => (int) env('METASEARCH_RATE_LIMIT', 20),
];
