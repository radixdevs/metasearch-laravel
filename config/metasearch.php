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
     * Requests per minute per caller.
     *
     * THIS IS THE ONLY THING PROTECTING THE ENDPOINT. The demo is public by
     * design — no password, no session — so anyone with the URL can search
     * through it, and every one of those searches spends Radix quota under our
     * credential. The credential itself never reaches the browser, which is the
     * part that matters; this bounds the rate at which a stranger can use it.
     *
     * Tuned for a person flipping switches while reading results, which is
     * bursty. Note the page issues TWO upstream requests per search when AI
     * suggestions are on, because those are fetched separately so they cannot
     * block the main results.
     *
     * On a single long-running server this is an accurate global count. The
     * Node version carried a caveat here because serverless gave every instance
     * its own counter, which made the same number mean very little.
     */
    'rate_limit' => (int) env('METASEARCH_RATE_LIMIT', 20),
];
