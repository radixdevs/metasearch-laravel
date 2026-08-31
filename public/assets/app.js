var MS=(()=>{var w=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var K=Object.prototype.hasOwnProperty;var J=(e,t)=>{for(var r in t)w(e,r,{get:t[r],enumerable:!0})},q=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of P(t))!K.call(e,s)&&s!==r&&w(e,s,{get:()=>t[s],enumerable:!(n=G(t,s))||n.enumerable});return e};var z=e=>q(w({},"__esModule",{value:!0}),e);var se={};J(se,{DEFAULT_CATALOGUE:()=>x,DEFAULT_SEARCH_INPUT:()=>k,MOCK_AI_LATENCY_MS:()=>M,MOCK_MAIN_LATENCY_MS:()=>I,PRIMARY_CATALOGUES:()=>A,buildRequestUrl:()=>L,getCatalogue:()=>m,mockSearch:()=>N,parseSearchInput:()=>y,partitionResults:()=>O,tokenizeJson:()=>D});var R=["store","tech","online","site","website","space","fun","uno","press","pw","host"],b=["store","tech","online","site","website","space","fun","uno","press","pw","host","com","net","org","ai","io","co","app","dev","uk","eu","de","au","fr","ca","nl","it"],T=[{id:"radix",label:"Radix Domains",tlds:R,heroTld:"store",primary:!0,confirmed:!0},{id:"classics",label:"Radix + Classics",tlds:[...R,"com","net","org"],heroTld:"tech",primary:!0,confirmed:!0},{id:"fullcat_uk_au",label:"Full Catalogue",detail:"UK + AU markets",tlds:b,heroTld:"site",primary:!0,confirmed:!0}],x="radix",A=T;function m(e){let t=T.find(r=>r.id===e);if(!t)throw new Error(`Unknown catalogue: ${e}`);return t}var k="";var E={store:{register:1.99,renew:59.99,freeFirstYear:!1},tech:{register:0,renew:12.99,freeFirstYear:!0},online:{register:1.99,renew:34.99,freeFirstYear:!1},site:{register:0,renew:9.99,freeFirstYear:!0},website:{register:1.99,renew:24.99,freeFirstYear:!1},space:{register:1.99,renew:24.99,freeFirstYear:!1},fun:{register:0,renew:29.99,freeFirstYear:!0},uno:{register:2.99,renew:19.99,freeFirstYear:!1},press:{register:39.99,renew:59.99,freeFirstYear:!1},pw:{register:1.99,renew:24.99,freeFirstYear:!1},host:{register:9.99,renew:79.99,freeFirstYear:!1},com:{register:9.99,renew:14.99,freeFirstYear:!1},net:{register:11.99,renew:16.99,freeFirstYear:!1},org:{register:9.99,renew:12.99,freeFirstYear:!1},ai:{register:69.99,renew:89.99,freeFirstYear:!1},io:{register:32.99,renew:32.99,freeFirstYear:!1},co:{register:12.99,renew:29.99,freeFirstYear:!1},app:{register:19.99,renew:19.99,freeFirstYear:!1},dev:{register:14.99,renew:14.99,freeFirstYear:!1},uk:{register:8.99,renew:11.99,freeFirstYear:!1},eu:{register:6.99,renew:9.99,freeFirstYear:!1},de:{register:7.99,renew:10.99,freeFirstYear:!1},au:{register:13.99,renew:17.99,freeFirstYear:!1},fr:{register:9.99,renew:13.99,freeFirstYear:!1},ca:{register:12.99,renew:15.99,freeFirstYear:!1},nl:{register:8.99,renew:11.99,freeFirstYear:!1},it:{register:8.99,renew:12.99,freeFirstYear:!1}},F=[e=>`${e}guide`,e=>`${e}hub`,e=>`get${e}`,e=>`${e}labs`,e=>`my${e}`,e=>`${e}works`,e=>`${e}spot`,e=>`the${e}`,e=>`${e}base`],C=[e=>`${e}collective`,e=>`${e}atelier`,e=>`${e}foundry`,e=>`${e}society`,e=>`${e}quarter`],Y=new Set(["coffee","shop","store","brew","cafe","tech","cloud","book","books","food","travel","music","game","games","art","design","studio","dev","app","apps","ai","data","home","house","health","fit","fitness","money","bank","news","media","photo","video","film","sport","sports","hotel","car","cars","pizza","beer","wine","tea","dog","cat","pet","pets","kids","baby","school","learn","code","crypto","web","site","online","market","mail","chat","social","blog","agency","group","works","labs","hub","world","global","city","life","love","style","fashion","beauty","hair","law","legal","doctor","clinic","farm","green","solar","energy","build","cash","pay","trade","invest","shopify","hello","garden","flower","tree","water","fire","earth","sky","star","moon","sun","river","ocean","mountain","forest","beach","island","bread","cake","sugar","salt","spice","fruit","apple","orange","lemon","berry","juice","milk","cheese","meat","fish","rice","soup","salad","table","chair","door","window","roof","floor","wall","room","kitchen","office","desk","paper","pen","ink","print","press","page","story","word","language","voice","sound","note","song","band","dance","stage","party","event","club","team","league","match","race","run","walk","ride","fly","sail","road","path","bridge","gate","key","lock","box","bag","gift","toy","play","fun","joy","smile","dream","hope","peace","power","force","speed","light","dark","shadow","color","paint","draw","craft","wood","stone","metal","glass","silk","cotton","wool","thread","shirt","shoe","hat","watch","ring","gold","silver","diamond","pearl","time","day","night","week","month","year","season","spring","summer","autumn","winter","north","south","east","west","map","place","space","field","park","yard","camp","trail","trip","tour","guide","plan","idea","mind","brain","smart","wise","true","real","pure","fresh","clean","clear","bright","quick","easy","simple","little","big","good","best","first","next","new","open","free","safe","strong","happy"]);var I=500,M=2600,H=new Set(b);function y(e){let t=e.trim().toLowerCase().replace(/^\.+|\.+$/g,""),r=t,n=null;for(;;){let o=r.lastIndexOf(".");if(o<=0)break;let l=r.slice(o+1);if(!H.has(l))break;n??(n=l),r=r.slice(0,o)}let s=r.slice(r.lastIndexOf(".")+1);return{cleaned:t,searchTerm:s,typedTld:n}}function L({input:e,catalogue:t,autosuggest:r,aiSuggest:n}){return`/api/search?${new URLSearchParams({search_term:y(e).cleaned,catalogue:t,autosuggest:String(r),aisuggest:String(n)}).toString()}`}function U(e){let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t=Math.imul(t,16777619);return t>>>0}function W(e){if(!e)return 0;let t=e.length<=4?4:e.length<=6?3:e.length<=8?2:e.length<=11?1:0;return Y.has(e)&&(t+=7),/\d/.test(e)&&(t-=3),/[^aeiou]{4}/.test(e)&&(t-=2),Math.min(10,Math.max(0,t))}var V={com:9,net:8,org:8,online:4,store:3,fun:1,tech:1,site:1},X=e=>/\d/.test(e)||/[^aeiou]{4}/.test(e);function f(e,t,r){let n=X(t)?0:V[r]??0,s=Math.min(10,W(t)+n);return U(e)%10>=s}function B(e,t){if(!t)return null;let r=E[e];if(!r)return null;let n=r.freeFirstYear?`1st Year Free, then $${r.renew.toFixed(2)}/yr`:r.register!==r.renew?`$${r.register.toFixed(2)} 1st yr, then $${r.renew.toFixed(2)}/yr`:`$${r.renew.toFixed(2)}/yr`;return{currency:"USD",register:r.register,renew:r.renew,period:"year",is_free_first_year:r.freeFirstYear,summary:n}}function $(e,t,r,n,s=!1){let o=`${e}.${t}`,l=s||f(o,e,t);return{type:r,domain_name:o,sld:e,tld:t,available:l,is_searched_exact:n,pricing:B(t,l)}}var Q=2,Z={radix:new Set,classics:new Set(["tech","com","net","org"]),fullcat_uk_au:new Set(["site","com","app","dev","net","org"])};function j(e,t,r){return r.has(t)?!0:U(`suggest|${e}|${t}`)%10<Q}var ee=(e,t)=>t.has(e);function te(e,t,r,n,s,o){if(f(`${e}.${t}`,e,t))return[{sld:e,substituted:!1}];let l=[];if(t===n&&l.push({sld:e,substituted:!1}),r&&(t===s||j(e,t,o))){let u=F.map(a=>a(e)).filter(a=>a!==e),p=[...u.filter(a=>f(`${a}.${t}`,a,t)),...u.filter(a=>!f(`${a}.${t}`,a,t))],d=t===s&&ee(s,o)?2:1;for(let a of p.slice(0,d))l.push({sld:a,substituted:!0})}return l}function N({input:e,catalogue:t,autosuggest:r,aiSuggest:n}){let{searchTerm:s,typedTld:o}=y(e),l=m(t),u=[];if(s){let a=l.tlds.flatMap(i=>te(s,i,r,o,l.heroTld,Z[t]).map(c=>({tld:i,entry:c}))),h=({tld:i,entry:c},v)=>$(c.sld,i,v,i===o&&!c.substituted,c.substituted),g=a.find(i=>i.tld===l.heroTld&&(i.entry.substituted||f(`${i.entry.sld}.${i.tld}`,i.entry.sld,i.tld)));g&&u.push(h(g,"hero"));let S=a.filter(i=>i!==g),_=i=>i.tld===o&&!i.entry.substituted;for(let i of[...S.filter(_),...S.filter(c=>!_(c))])u.push(h(i,"result"))}n&&s&&C.slice(0,4).forEach((a,h)=>{let g=l.tlds[h%l.tlds.length];g&&u.push($(a(s),g,"ai_suggestion",!1))});let p=new Set,d=u.filter(a=>p.has(a.domain_name)?!1:(p.add(a.domain_name),!0));return{results:d,results_total:d.filter(a=>a.type==="result").length,results_hidden:0,meta:{search_term:s,typed_tld:o,autosuggest:r,aisuggest:n}}}function O(e){let t=[],r=[],n=null;for(let s of e.results)s.type==="ai_suggestion"?r.push(s):s.type==="hero"?n=s:t.push(s);return{hero:n,results:t,aiSuggestions:r}}var re=/"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b/g;function D(e){let t=[],r=new RegExp(re),n=0,s;for(;(s=r.exec(e))!==null;){s.index>n&&t.push({text:e.slice(n,s.index),kind:"punctuation"});let o=s[0];if(o.startsWith('"')){let l=/^\s*:/.test(e.slice(s.index+o.length));t.push({text:o,kind:l?"key":"string"})}else t.push({text:o,kind:"literal"});n=s.index+o.length}return n<e.length&&t.push({text:e.slice(n),kind:"punctuation"}),t}return z(se);})();

/*
 * Artifact view layer.
 *
 * The shell markup, every CSS class and the search logic are all lifted verbatim
 * from the running Next app — the markup by serialising its DOM, the logic by
 * bundling lib/ with esbuild. Only this file is new, and all it does is what
 * React was doing: keep state and re-render.
 *
 * The beam is gone from the app, so it is gone from here: no [data-beam] host, no
 * runtime stylesheet, no fade bookkeeping in renderUnit.
 */
(function () {
  var L = MS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  var PAGE_SIZE = 10;
  var s = {
    input: L.DEFAULT_SEARCH_INPUT,
    catalogueId: L.DEFAULT_CATALOGUE,
    autosuggest: false,
    aiSuggest: false,
    hasSearched: false,
    isSearching: false,
    isGeneratingAi: false,
    main: null,
    ai: null,
    searchedTerm: "",
    visible: PAGE_SIZE,
    focused: false,
    /* Arjava: "Need to add a validation error if someone click on search with no
       values entered". True from an empty submit until the next keystroke. */
    emptyError: false,
    /* Measured round trips, one per call. Ansh noticed `time` had vanished from
       the dialog: it was the first cell of the page readout the reviewer had
       deleted, and only the other four pairs moved into the dialog's meta. */
    mainElapsedMs: null,
    aiElapsedMs: null,
    /* Live only: the artifact answers from a function that cannot fail. */
    failure: null,
  };
  var timers = {};

  /* ---------------------------------------------------------------- templates */
  var BADGE = "shrink-0 rounded-[var(--radius-md)] px-1.5 py-0.5 font-sans text-[9px] font-semibold tracking-wide";
  var SPARKLES = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 shrink-0 text-accent-purple-strong"><path d="M6.25 1.75l1.15 2.6 2.6 1.15-2.6 1.15L6.25 9.25 5.1 6.65 2.5 5.5l2.6-1.15L6.25 1.75Z"></path><path d="M11.75 8.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z"></path></svg>';
  var SPINNER = '<svg class="size-5 text-accent-purple-strong animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.25"></circle><path d="M14.25 8A6.25 6.25 0 0 0 8 1.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>';
  var COPY_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3"><rect x="5.75" y="5.75" width="8.5" height="8.5" rx="1.5"></rect><path d="M10.25 3.25A1.5 1.5 0 0 0 8.75 1.75h-5A1.5 1.5 0 0 0 2.25 3.25v5a1.5 1.5 0 0 0 1.5 1.5"></path></svg>';
  var CHECK_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3 text-accent-green-graphic"><path d="M3 8.5 6.25 11.75 13 5"></path></svg>';
  var COPY_BTN_CLASS = "flex shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] border border-stroke-strong bg-elevated px-2 py-1 text-[11px] font-medium text-text-secondary elevate-float transition-colors hover:bg-stroke-default hover:text-text-primary active:bg-stroke-strong disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-elevated disabled:hover:text-text-secondary";

  /*
   * Ported from copy-button.tsx, fallback included. The fallback earns its keep
   * here more than it does in the app: an artifact renders inside a sandboxed
   * frame, where the async Clipboard API is often refused outright, and the
   * selection-based copy still goes through.
   */
  function writeToClipboard(text) {
    var tryAsync = function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; });
      }
      return Promise.resolve(false);
    };
    return tryAsync().then(function (ok) {
      if (ok) return true;
      try {
        var area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.top = "-9999px";
        document.body.appendChild(area);
        area.select();
        var done = document.execCommand("copy");
        document.body.removeChild(area);
        return done;
      } catch (e) { return false; }
    });
  }

  /* The chevrons are CodeIcon's own path data, not an approximation of it: an
     approximation is what was here, and a markup diff against the app caught it.
     build.mjs now asserts both `d` values against the app's rendered button. */
  var CODE_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3.5 text-text-tertiary transition-colors group-hover:text-text-primary"><path d="M5.5 11 2.5 8l3-3"></path><path d="M10.5 5l3 3-3 3"></path></svg>';

  function domainName(r, cls) {
    return '<span class="' + cls + '"><span class="font-normal text-text-secondary">' + esc(r.sld) +
      '</span><span class="font-semibold text-text-primary">.' + esc(r.tld) + "</span></span>";
  }
  function availability(ok) {
    return ok
      ? '<span class="' + BADGE + ' bg-accent-green-tint text-accent-green-ink">AVAILABLE</span>'
      : '<span class="' + BADGE + ' bg-elevated text-text-secondary">TAKEN</span>';
  }
  var HERO_BADGE = '<span class="' + BADGE + ' bg-accent-blue-tint text-accent-blue-graphic">HERO</span>';
  /* The pill it sits in is ALREADY blue-tinted, so this one drops the fill —
     HeroBadge's `onTint`. Two stacked tints measured 4.09:1 in light and failed
     AA; one measures 4.86:1. */
  var HERO_BADGE_ON_TINT = '<span class="' + BADGE + ' text-accent-blue-graphic px-0">HERO</span>';
  /* The loud one, for the hero card only. See HeroBadge's `prominent` branch. */
  var HERO_BADGE_BIG = '<span class="shrink-0 rounded-[var(--radius-md)] bg-accent-blue px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-on-accent">Hero</span>';
  var EXACT_BADGE = '<span class="' + BADGE + ' border border-stroke-strong bg-transparent font-medium uppercase text-text-secondary">Exact match</span>';

  /* The fallback names the domain's state, not the API field's. Reviewer. */
  function price(r) { return r.pricing ? esc(r.pricing.summary) : "Unavailable"; }

  function resultRow(r) {
    var isHero = r.type === "hero";
    return '<li class="flex flex-wrap items-center gap-x-3 gap-y-0.5 px-4 py-3.5 sm:px-5 sm:py-4 ' +
      (isHero ? "bg-accent-green-900" : "") + '"><div class="flex min-w-0 flex-1 items-center gap-2">' +
      domainName(r, "truncate font-sans text-sm") + availability(r.available) +
      (r.is_searched_exact ? EXACT_BADGE : "") + (isHero ? HERO_BADGE : "") +
      "</div>" +
      '<span class="w-full shrink-0 text-xs text-text-secondary sm:w-56 sm:text-right">' + price(r) + "</span></li>";
  }

  function heroCard(r) {
    /* Price on the right of the name line, matching every result row. Reviewer. */
    return '<section aria-label="Hero result" class="overflow-hidden rounded-[var(--radius-unit)] border border-[var(--hero-edge)] bg-accent-green-900 px-5 py-6 sm:px-7 sm:py-7">' +
      '<div class="flex flex-wrap items-center gap-x-3 gap-y-2">' +
      '<div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">' +
      domainName(r, "font-sans text-xl tracking-tight sm:text-2xl") + HERO_BADGE_BIG +
      availability(r.available) + (r.is_searched_exact ? EXACT_BADGE : "") +
      '</div><span class="w-full shrink-0 text-sm text-text-secondary sm:w-auto sm:text-right">' +
      price(r) + "</span></div></section>";
  }

  function heroSkeleton() {
    return '<section aria-hidden="true" class="overflow-hidden rounded-[var(--radius-unit)] border border-stroke-subtle bg-card px-5 py-6 sm:px-7 sm:py-7">' +
      '<div class="skeleton h-7 w-64 rounded-md"></div><div class="skeleton mt-4 h-5 w-40 rounded-md"></div></section>';
  }

  /*
   * SkeletonRows' own array, verbatim, and only the first column varies — the
   * other two are fixed at w-20 and w-32 in the app.
   *
   * This used to be a made-up 8x3 table, and one of its invented widths was
   * w-24, which the app uses nowhere: Tailwind never emitted a rule for it, so
   * that bar rendered at zero width in the artifact's loading state. Found by the
   * sheet guard in build.mjs, which is now the thing that keeps this honest.
   */
  var SKEL_W = ["w-40", "w-32", "w-48", "w-36", "w-44", "w-28", "w-40", "w-36"];
  function skeletonRows(n) {
    var out = "";
    for (var i = 0; i < n; i++) {
      out += '<li class="flex items-center gap-3 py-3 pl-4 pr-4"><div class="min-w-0 flex-1">' +
        '<div class="skeleton h-3.5 ' + SKEL_W[i % SKEL_W.length] + '"></div></div>' +
        '<div class="skeleton h-4 w-20 shrink-0"></div><div class="skeleton h-3 w-32 shrink-0"></div></li>';
    }
    return '<ul class="divide-y divide-stroke-subtle" aria-hidden="true">' + out + "</ul>";
  }

  function statsLine() {
    /* Just the trigger. The five-pair readout was deleted at the reviewer's
       call — its numbers live in the dialog's meta line, which took its weight.
       s.elapsedMs went with it; nothing else read it. The trigger is wired in
       renderResults, since this markup is rebuilt on every render. */
    return '<div class="flex justify-end pb-2 pt-2">' +
      '<button type="button" data-dev class="btn-tertiary group flex shrink-0 items-center gap-2 rounded-[var(--radius-cta)] px-2.5 py-1.5 text-[13px] font-medium">' +
      CODE_ICON + "Raw API response</button></div>";
  }

  function resultsSection(results) {
    var cat = L.getCatalogue(s.catalogueId);
    var head = function (right) {
      return '<div class="flex items-baseline justify-between gap-4 border-b border-stroke-subtle px-4 py-4 sm:px-6 sm:py-5">' +
        '<h2 class="text-[13px] font-semibold tracking-tight text-text-primary">Results</h2>' +
        '<span class="truncate text-xs font-semibold text-text-primary">' + right + "</span></div>";
    };
    var open = '<section class="overflow-hidden rounded-[var(--radius-unit)] border border-stroke-subtle bg-card">';

    if (s.isSearching) {
      var n = Math.min(Math.max(cat.tlds.length, 3), 8);
      return open + head('Searching for <span class="font-mono text-text-secondary">“' + esc(s.searchedTerm) + '”</span>') +
        skeletonRows(n) + "</section>";
    }
    if (!results.length) {
      return open + head("0 domains") +
        '<div class="px-4 py-14 text-center sm:px-6"><p class="text-sm text-text-tertiary">No exact matches available in ' +
        esc(cat.label) + '.</p><p class="mx-auto mt-2.5 max-w-md text-xs leading-relaxed text-text-tertiary">' +
        (s.searchedTerm
          ? (function () {
              /* Name the DOMAIN when one was typed. Someone who searched
                 "coffeeshop.tech" asked about a specific domain, and answering
                 about "coffeeshop" answers a question they did not ask. The
                 response carries typed_tld for exactly this. */
              var tld = s.main && s.main.meta ? s.main.meta.typed_tld : null;
              return '<span class="font-mono">' +
                esc(tld ? s.searchedTerm + "." + tld : s.searchedTerm) + "</span> " +
                (tld
                  ? "is taken, and so is every other TLD in this catalogue. "
                  : "is already registered on every TLD in this catalogue, including the hero TLD. ") +
                (s.autosuggest ? "No alternative was available either." : "Turn on Autosuggest to look for alternatives.");
            })()
          : "Enter a term to search this catalogue.") + "</p></div></section>";
    }
    var shown = results.slice(0, s.visible);
    var remaining = results.length - shown.length;
    var right = remaining > 0
      ? shown.length + " of " + results.length + " domains"
      : results.length + " domain" + (results.length === 1 ? "" : "s");
    /* One press reveals the remainder — no pager. Reviewer. */
    var more = remaining > 0
      ? '<div class="flex justify-center border-t border-stroke-subtle px-4 py-4 sm:px-6">' +
        '<button type="button" data-more class="rounded-[var(--radius-cta)] bg-[var(--btn-face)] px-4 py-2 text-[13px] font-medium text-text-primary transition-colors hover:bg-[var(--btn-face-hover)]">Show more</button></div>'
      : "";
    return open + head(right) + '<ul class="divide-y divide-stroke-subtle">' +
      shown.map(resultRow).join("") + "</ul>" + more + "</section>";
  }

  function aiSection(suggestions) {
    var head = '<div class="flex items-center gap-2 border-b border-stroke-subtle bg-accent-purple-tint px-4 py-4 sm:px-6 sm:py-5">' +
      SPARKLES + '<h2 class="text-[13px] font-semibold tracking-tight text-accent-purple-ink">AI-generated suggestions</h2>' +
      '<span class="ml-auto text-xs font-semibold text-text-primary">' +
      (s.isGeneratingAi ? "" : suggestions.length + " suggestion" + (suggestions.length === 1 ? "" : "s")) + "</span></div>";
    var body;
    if (s.isGeneratingAi) {
      body = '<div role="status" class="flex flex-col items-center gap-3 bg-accent-purple-tint px-4 py-14 text-center sm:px-6">' +
        SPINNER + '<p class="text-sm text-accent-purple-ink">Generating AI suggestions…</p>' +
        '<p class="max-w-xs text-xs leading-relaxed text-text-secondary">This usually takes a second or two, and is faster once a term has been asked before.</p></div>';
    } else if (!suggestions.length) {
      body = '<p class="px-4 py-10 text-center text-sm text-text-tertiary sm:px-6">No AI suggestions for this term.</p>';
    } else {
      body = '<ul class="divide-y divide-stroke-subtle">' + suggestions.map(function (r) {
        return '<li class="flex flex-wrap items-center gap-x-3 gap-y-0.5 px-4 py-3.5 sm:px-5 sm:py-4">' +
          '<div class="flex min-w-0 flex-1 items-center gap-2">' +
          domainName(r, "truncate font-sans text-sm") + availability(r.available) + "</div>" +
          '<span class="w-full shrink-0 text-xs text-text-secondary sm:w-56 sm:text-right">' + price(r) + "</span></li>";
      }).join("") + "</ul>";
    }
    return '<section class="overflow-hidden rounded-[var(--radius-unit)] border border-stroke-subtle bg-card">' + head + body + "</section>";
  }

  var EMPTY_STATE = $("main > div:last-child").innerHTML;

  /* ------------------------------------------------------------------ renders */
  var resultsArea = $("main > div:last-child");
  var tldBlock = $("main > div.mt-4");

  function renderResults() {
    /* scroll-mt rides along in BOTH states: it is what stops the sticky nav and
       the collapsed bar covering the top of the results when a search scrolls
       here, and this function owns the class list. Dropping it was caught by the
       markup diff; the value grew to 40 when the nav became sticky. */
    if (!s.hasSearched) {
      resultsArea.className = "scroll-mt-40 mt-6";
      resultsArea.innerHTML = EMPTY_STATE;
      return;
    }
    resultsArea.className = "scroll-mt-40 mt-4";
    if (s.failure) { resultsArea.innerHTML = failureBlock(s.failure); return; }
    var part = s.main ? L.partitionResults(s.main) : { hero: null, results: [] };
    var aiPart = s.ai ? L.partitionResults(s.ai) : { aiSuggestions: [] };
    var html = "";
    if (s.main && !s.isSearching) html += statsLine();
    html += '<div class="space-y-6">';
    html += s.isSearching ? heroSkeleton() : part.hero ? heroCard(part.hero) : "";
    html += resultsSection(part.results);
    if (s.aiSuggest && (s.isGeneratingAi || s.ai)) html += aiSection(aiPart.aiSuggestions || []);
    html += "</div>";
    resultsArea.innerHTML = html;
    var more = $("[data-more]", resultsArea);
    if (more) more.addEventListener("click", function () { s.visible = part.results.length; renderResults(); });
    /* Lives on the stats row now, which this function rebuilds, so it is rewired
       every render rather than created once. It therefore also disappears on its
       own before the first search and while one is in flight, matching the app. */
    var dev = $("[data-dev]", resultsArea);
    if (dev) dev.addEventListener("click", openDialog);
  }

  function renderTldBlock() {
    var cat = L.getCatalogue(s.catalogueId);
    var summary = $("div.min-w-0.flex-1", tldBlock);
    summary.innerHTML = '<p class="text-[13px] font-medium text-text-primary sm:truncate">' + cat.tlds.length +
      ' TLDs in this catalogue<span class="ml-2 inline-flex items-center gap-1.5 rounded-[var(--radius-cta)] bg-accent-blue-tint px-2 py-0.5 align-middle">' +
      '<span class="font-sans text-[9px] font-bold uppercase leading-none tracking-[0.08em] text-accent-blue-graphic">Hero</span>' +
      '<span class="font-mono text-[11px] font-semibold leading-none text-accent-blue-graphic">.' + esc(cat.heroTld) + "</span></span></p>" +
      '<p class="mt-2 text-xs text-text-tertiary sm:truncate">Set by the catalogue you picked. The API takes no TLD parameter.</p>';
    var list = $("ul.flex-wrap", tldBlock);
    list.innerHTML = cat.tlds.map(function (t) {
      var isHero = t === cat.heroTld;
      return '<li class="flex items-center gap-1 rounded-[var(--radius-cta)] px-2.5 py-1 font-mono text-[11px] ' +
        (isHero ? "bg-accent-blue-tint text-accent-blue-graphic" : "bg-elevated text-text-secondary") + '">' +
        /* HERO leads, matching the summary chip. Reviewer. */
        (isHero ? HERO_BADGE_ON_TINT : "") + "." + esc(t) + "</li>";
    }).join("");
  }

  /* -------------------------------------------------------- search unit state */
  var pane = $(".search-pane");
  var inputEl = $('input[aria-label="Search term"]');
  var cta = $(".cta-green");
  var ctaLabel = $(".cta-label", cta);

  function renderUnit() {
    /* One boolean, one consumer. It used to drive the beam's active/fading
       attributes as well, which is why the fade timer lived here; both are gone
       with the beam. The ring stays: it is the input's only focus indicator.
       The s.hasTyped half went with the pre-filled default. */
    var engaged = s.focused || inputEl.value.length > 0;
    if (engaged) pane.setAttribute("data-engaged", "");
    else pane.removeAttribute("data-engaged");
    /* Green in every state now, with the rollover pinned off while disabled —
       see the note on the button in SearchUnit for why that pair is needed.
       isSearching ONLY: an empty box used to disable this, which swallowed the
       press Arjava wanted answered. The empty case is the error row below. */
    cta.disabled = s.isSearching;
    paintEmptyError();
    paintHint();
    /* The LABEL SPAN, not the button's textContent: the button also holds the
       arrow glyph the stuck phone bar shows, and writing textContent would
       delete it. It would also delete the span itself, which is what keeps the
       button's accessible name once the label is clipped. */
    ctaLabel.textContent = s.isSearching ? "Searching" : "Search";
    /* This string is why the artifact's button was a 96x20 pill for one
       build — Tailwind had pruned .h-12 from the sheet the moment the app
       stopped using it, so the class resolved to nothing and the button
       collapsed to its content height. The sheet guard in build.mjs now checks
       every class this file writes. No order utilities since the Customize
       disclosure: the DOM order is the phone's visual order now, and mt-2 is
       the field-to-button gap the collapsed rows no longer supply. */
    cta.className = "cta-green flex h-12 shrink-0 items-center justify-center rounded-[var(--radius-cta)] bg-accent-green px-4 text-sm font-semibold text-on-accent hover:bg-[var(--cta-hover)] hover:text-[var(--cta-hover-ink)] disabled:hover:bg-accent-green disabled:hover:text-on-accent sm:px-6";
  }

  /*
   * THE EMPTY-SEARCH ERROR ROW. React renders this conditionally, so the
   * captured shell has no such element and this file has to build it.
   *
   * MOUNTED AND UNMOUNTED, not shown and hidden. Hiding was the first version
   * and a suite caught it: React unmounts the node, so the two implementations
   * disagreed on whether a [role=alert] existed while there was no error. The
   * accessibility argument settles which one is right — an alert that is only
   * un-hidden may not be announced a second time, because the node was there all
   * along, whereas one that mounts fresh always is.
   *
   * The SVG's attribute order is the order React emits for an icon from
   * icons.tsx: the shared `base` spread first, className last. It is not diffed
   * (diff.mjs covers the results area and the dialog), but a hand-written icon
   * that drifts from its component is the exact class of bug the cloned
   * catalogue mark exists to prevent, so it is written to match.
   */
  /*
   * THE LINE UNDER THE CARD, which reads back whatever is in the box. React
   * derives it during render; here it is repainted from renderUnit, which the
   * input listener already calls on every keystroke.
   *
   * BUILT FROM NODES, not innerHTML, and that is not a style preference: the
   * term is whatever the visitor typed, and this is a static page with no
   * server to sanitise anything. `<span>` written into innerHTML would run.
   * append() with a real element and text nodes cannot.
   *
   * L.parseSearchInput is the same function the app imports, out of the same
   * bundle, so the two cannot disagree about what counts as an extension.
   */
  var hintEl = $("[data-hint]");
  function paintHint() {
    if (!hintEl) return;
    var q = L.parseSearchInput(inputEl.value);
    var strong = function (t) {
      var el = document.createElement("span");
      el.className = "font-medium text-text-primary";
      el.textContent = t;
      return el;
    };
    hintEl.textContent = "";
    /* the switch is half the sentence: autosuggest substitutes a different name
       on every TLD where the term is taken, so "the extensions where X is free"
       describes the wrong response when it is on. See the note in SearchUnit. */
    if (q.typedTld) {
      hintEl.append("You\u2019ll get ", strong(q.searchTerm + "." + q.typedTld),
        s.autosuggest ? " exactly, available or taken, plus alternative names." : " exactly, available or taken.");
    } else if (q.searchTerm) {
      hintEl.append("You\u2019ll get the extensions where ", strong(q.searchTerm),
        s.autosuggest ? " is free, plus alternative names where it is taken." : " is free. Ones where it is taken are left out.");
    } else {
      hintEl.append("Search a name for the extensions where it\u2019s free, or a full domain for that exact match.");
    }
  }

  /* THE NUDGE. element.animate rather than a CSS class for the reason spelled
     out in SearchUnit: a class does not restart while it is already on the
     element, so the second press on an empty box would do nothing. */
  function nudge() {
    if (!pane || typeof pane.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pane.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(2px)" },
      { transform: "translateX(0)" }
    ], { duration: 340, easing: "ease-out" });
  }

  var errorRow = null;
  function paintEmptyError() {
    if (!s.emptyError) {
      if (errorRow) { errorRow.remove(); errorRow = null; }
      pane.removeAttribute("data-invalid");
      inputEl.removeAttribute("aria-invalid");
      inputEl.removeAttribute("aria-describedby");
      return;
    }
    /* the coral outline, same attribute the app sets on the form */
    pane.setAttribute("data-invalid", "");
    if (!errorRow) {
      /* Resolved here rather than at module scope: renderUnit calls this, and a
         hoisted function reading a `var` that has not been initialised yet is a
         trap waiting for the first time something renders earlier. */
      var fieldRow = $("[data-field-row]", pane);
      if (!fieldRow) return;
      errorRow = document.createElement("div");
      errorRow.id = "search-empty-error";
      errorRow.setAttribute("role", "alert");
      errorRow.className = "mx-3.5 mb-2.5 flex items-center gap-2 rounded-md bg-accent-coral-tint px-2.5 py-1.5 text-xs text-accent-coral-ink sm:mx-5";
      errorRow.innerHTML =
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
        'class="size-3.5 shrink-0 text-accent-coral-graphic">' +
        '<path d="M8 2.5 14.5 13.5h-13L8 2.5Z"></path>' +
        '<path d="M8 6.75v2.75M8 11.4h.01"></path></svg>' +
        "Enter a domain name to search.";
      fieldRow.insertAdjacentElement("afterend", errorRow);
    }
    inputEl.setAttribute("aria-invalid", "true");
    inputEl.setAttribute("aria-describedby", "search-empty-error");
  }

  /* ----------------------------------------------------------------- dialog */
  var dialog = null;
  function requestList() {
    var url = function (ai) {
      return L.buildRequestUrl({ input: s.input, catalogue: s.catalogueId, autosuggest: s.autosuggest, aiSuggest: ai });
    };
    var list = [{ label: "Main results", url: url(false), response: s.main, pending: s.isSearching, elapsedMs: s.mainElapsedMs }];
    if (s.aiSuggest) list.push({ label: "AI suggestions", url: url(true), response: s.ai, pending: s.isGeneratingAi, elapsedMs: s.aiElapsedMs });
    return list;
  }
  var TOKEN_CLASS = { key: "text-code-key", string: "text-code-string", literal: "text-code-literal", punctuation: "text-code-punct" };
  function jsonView(obj) {
    return L.tokenizeJson(JSON.stringify(obj, null, 2)).map(function (t) {
      return '<span class="' + TOKEN_CLASS[t.kind] + '">' + esc(t.text) + "</span>";
    }).join("");
  }
  function openDialog() {
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "m-auto w-[calc(100%-2rem)] max-w-3xl bg-transparent p-0 backdrop:bg-scrim";
      /* The app labels its dialog with the panel's own <h2> via aria-labelledby
         and React's useId. This had neither, so the modal announced itself
         unnamed — caught by diffing the app's dialog against this one. The id is
         a literal rather than a generated one because there is exactly one. */
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-labelledby", "dev-dialog-title");
      dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
      document.body.appendChild(dialog);
    }
    dialog.innerHTML =
      '<div class="flex max-h-[85dvh] flex-col overflow-hidden rounded-[var(--radius-unit)] border border-stroke-default bg-card elevate-pop">' +
      '<div class="flex shrink-0 items-start gap-4 border-b border-stroke-subtle px-5 py-4"><div class="min-w-0 flex-1">' +
      '<h2 id="dev-dialog-title" class="text-[13px] font-semibold tracking-tight text-text-primary">Raw API response</h2>' +
      '<p class="mt-1 text-xs leading-relaxed text-text-tertiary">Exactly what a live integration receives. These are real responses from the MetaSearch API. The base call checks the typed term against every TLD in the catalogue, one entry per TLD. A TLD whose exact match is taken is omitted, unless you typed that exact domain, in which case it comes back marked unavailable. AI suggestions use a second call so the main results aren&apos;t held up while they generate.</p></div>' +
      '<button type="button" data-close aria-label="Close raw API response" class="btn-tertiary flex shrink-0 items-center justify-center rounded-[var(--radius-cta)] p-1.5">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3.5"><path d="M4 4l8 8M12 4l-8 8"></path></svg></button></div>' +
      '<div class="min-h-0 flex-1 overflow-y-auto">' + requestList().map(function (r) {
        /* 12px, keys secondary, values weighted primary: this is the only
           place these numbers appear now that the page readout is gone. */
        var meta = r.response && r.response.meta
          ? '<div class="flex flex-wrap gap-x-5 gap-y-1 px-5 pb-3 font-mono text-xs text-text-secondary">' +
            '<span>search_term: <span class="font-medium text-text-primary">' + esc(JSON.stringify(r.response.meta.search_term)) + "</span></span>" +
            '<span>typed_tld: <span class="font-medium text-text-primary">' + esc(JSON.stringify(r.response.meta.typed_tld)) + "</span></span>" +
            '<span title="Counts result rows only. The hero and any ai_suggestion entries are excluded.">results_total: <span class="font-medium text-text-primary">' + r.response.results_total + '</span><span class="text-text-tertiary"> (result rows only)</span></span>' +
            '<span>results_hidden: <span class="font-medium text-text-primary">' + r.response.results_hidden + "</span></span></div>"
          : "";
        return '<div class="border-b border-stroke-subtle last:border-b-0">' +
          '<div class="flex items-center gap-2 px-5 py-3"><span class="text-[10px] uppercase tracking-wide text-text-tertiary">' + r.label + "</span>" +
          (r.pending
            ? '<span class="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-accent-purple-strong">pending</span>'
            /* On the request's own row, NOT in the meta line below: every pair
               there is a field the API returns, and this is the client's own
               stopwatch. See DeveloperPanel. */
            : r.elapsedMs !== null && r.elapsedMs !== undefined
            /* class BEFORE title, which is the order React's client render
               serialises them in: a markup diff against the app caught the
               reverse. */
            ? '<span class="font-mono text-[10px] tracking-wide text-text-tertiary" title="Measured in the browser, from the call starting to its response rendering. This demo answers from sample data on a timer, so it is the demo&#39;s own latency rather than the API&#39;s.">' + r.elapsedMs + " ms</span>"
            : "") + "</div>" +
          '<div class="px-5 pb-3"><code class="block break-all font-mono text-xs text-code-string">GET ' + esc(r.url) + "</code></div>" + meta +
          /*
           * The Copy button belongs to the code box, so it is pinned to this
           * wrapper's top-right rather than placed in a row above — pinning to
           * the wrapper and not inside the <pre> keeps it in the corner while
           * the JSON scrolls under it. pr-24 is the room it needs.
           */
          '<div class="px-5 pb-4"><div class="relative">' +
          '<pre class="max-h-64 overflow-auto rounded-[var(--radius-md)] bg-elevated p-3 pr-24 font-mono text-xs leading-relaxed text-text-secondary">' +
          (r.pending ? "// awaiting response…" : r.response ? jsonView(r.response) : "// not requested") + "</pre>" +
          '<div class="absolute right-2 top-2"><button type="button" data-copy="' + esc(r.label) + '"' +
          (r.response ? "" : " disabled") + ' aria-label="Copy ' + esc(r.label) + ' response JSON" class="' + COPY_BTN_CLASS + '">' +
          COPY_ICON + '<span aria-live="polite">Copy</span></button></div></div></div></div>';
      }).join("") + "</div></div>";
    $("[data-close]", dialog).addEventListener("click", function () { dialog.close(); });
    var payloads = {};
    requestList().forEach(function (r) { payloads[r.label] = r.response; });
    $$("[data-copy]", dialog).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var body = payloads[btn.getAttribute("data-copy")];
        var icon = $("svg", btn), text = $("span", btn);
        writeToClipboard(body ? JSON.stringify(body, null, 2) : "").then(function (ok) {
          icon.outerHTML = ok ? CHECK_ICON : COPY_ICON;
          text.textContent = ok ? "Copied" : "Failed";
          clearTimeout(timers.copy);
          timers.copy = setTimeout(function () {
            var i = $("svg", btn);
            if (i) i.outerHTML = COPY_ICON;
            var t = $("span", btn);
            if (t) t.textContent = "Copy";
          }, 1600);
        });
      });
    });
    dialog.showModal();
  }

  /* ------------------------------------------------------------------- search */
  /*
   * `reveal` mirrors MetaSearchDemo's override of the same name: the Search
   * button and Enter set it, the switches and the catalogue do not, because
   * those are pressed while you are already looking at the results.
   */
  function runSearch(reveal) {
    if (!inputEl.value.trim()) return;
    s.input = inputEl.value;
    s.searchedTerm = L.parseSearchInput(s.input).searchTerm;
    s.isSearching = true;
    s.visible = PAGE_SIZE;
    s.hasSearched = true;
    s.ai = null;
    var args = { input: s.input, catalogue: s.catalogueId, autosuggest: s.autosuggest, aiSuggest: false };
    /* One clock per call, started before the render so it spans the whole wait
       rather than the timer's nominal delay. */
    var startedAt = performance.now();
    s.mainElapsedMs = null;
    s.aiElapsedMs = null;
    renderUnit(); renderResults();
    /* After the render, so the region has a height to scroll to; the sticky
       bar is accounted for by scroll-mt on the region itself. */
    if (reveal) {
      requestAnimationFrame(function () {
        var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        resultsArea.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      });
    }
    if (inflight) inflight.abort();
    inflight = new AbortController();
    var signal = inflight.signal;
    s.failure = null;

    liveSearch(args, signal, function (payload, failure) {
      if (signal.aborted) return;
      s.main = payload;
      s.failure = failure;
      s.mainElapsedMs = Math.round(performance.now() - startedAt);
      s.isSearching = false;
      renderUnit(); renderResults();
    });

    if (s.aiSuggest) {
      s.isGeneratingAi = true;
      liveSearch(
        { input: s.input, catalogue: s.catalogueId, autosuggest: s.autosuggest, aiSuggest: true },
        signal,
        function (payload) {
          if (signal.aborted) return;
          /* An AI failure leaves the main results alone: they are already on
             screen and still true. Only the AI block goes quiet. */
          s.ai = payload;
          s.aiElapsedMs = Math.round(performance.now() - startedAt);
          s.isGeneratingAi = false;
          renderResults();
        },
      );
    }
  }

  /*
   * EMPTYING THE BOX RESETS THE PAGE, ported from MetaSearchDemo's changeInput —
   * see the note there for why it resets the switches and the catalogue too, and
   * why s.hasTyped is deliberately NOT reset.
   *
   * The paint* functions are how a React-less view puts a control back: React
   * re-renders from state, this has to write the attribute and the class list
   * itself. They are the same functions the click handlers use, so there is one
   * definition of what an off switch looks like.
   */
  function resetToLanding() {
    clearTimeout(timers.main);
    clearTimeout(timers.ai);
    if (inflight) { inflight.abort(); inflight = null; }
    s.failure = null;
    s.hasSearched = false;
    s.isSearching = false;
    s.isGeneratingAi = false;
    s.main = null;
    s.ai = null;
    s.searchedTerm = "";
    s.visible = PAGE_SIZE;
    s.mainElapsedMs = null;
    s.aiElapsedMs = null;
    s.autosuggest = false;
    s.aiSuggest = false;
    s.catalogueId = L.DEFAULT_CATALOGUE;
    paintAutosuggest(false);
    paintAiSuggest(false);
    paintCatalogues(s.catalogueId);
    paintMenu(s.catalogueId);
    renderTldBlock();
    if (dialog && dialog.open) dialog.close();
    renderResults();
  }

  /* -------------------------------------------------------------------- wiring */
  /*
   * A SHORTER PLACEHOLDER ON A PHONE, ported from SearchUnit. The composer's
   * dropdown and the catalogue (?) beside it take about 155px of the field row,
   * so the phone gets the half that carries information: a bare domain, which
   * next to a magnifier still reads as an example. React does this in an effect for the same reason this is
   * JavaScript: placeholder is an attribute and no CSS can rewrite text.
   */
  var narrow = window.matchMedia("(width < 40rem)");
  function applyPlaceholder() {
    inputEl.placeholder = narrow.matches
      ? "e.g. coffee.tech"
      : "Search for a domain, e.g. coffee.tech";
  }
  applyPlaceholder();
  narrow.addEventListener("change", applyPlaceholder);

  inputEl.value = s.input;
  inputEl.addEventListener("input", function () {
    s.input = inputEl.value;
    /* Answered by the first keystroke, not by the next submit. */
    s.emptyError = false;
    if (s.input.trim().length === 0) resetToLanding();
    renderUnit();
  });
  pane.addEventListener("focusin", function () { s.focused = true; renderUnit(); });
  pane.addEventListener("focusout", function () { s.focused = false; renderUnit(); });
  pane.addEventListener("submit", function (e) {
    e.preventDefault();
    /* Trimmed, so a box of spaces is empty here too — it has to agree with the
       same test inside runSearch or the press reports success and does nothing. */
    if (inputEl.value.trim().length === 0) {
      s.emptyError = true;
      renderUnit();
      inputEl.focus();
      nudge();
      return;
    }
    s.emptyError = false;
    runSearch(true);
  });

  /* Pulled out of the click handler because the reset below has to repaint the
     filter row too, and a second copy of these class strings is exactly the kind
     of thing that drifts. */
  /*
   * THE SEGMENTED CONTROL, ported from CatalogueTabs.
   *
   * One colour per catalogue, and all three are -graphic rather than the brand
   * pastel: the pill is a solid fill now, and a mint pill on light's grey track
   * measures 1.08:1. See the component for the numbers. build.mjs asserts every
   * string here against the app's own rendered markup, since the captured shell
   * can only ever show the default one selected.
   */
  var PILL_FILL = {
    radix: "bg-accent-blue-deep",
    classics: "bg-accent-coral-deep",
    fullcat_uk_au: "bg-accent-green-deep",
  };
  /* Colour only on selection, label and icon together. See CatalogueTabs. */
  var SELECTED_INK = {
    radix: "text-accent-blue",
    classics: "text-accent-coral",
    fullcat_uk_au: "text-accent-green",
  };
  var BTN_BASE = "relative flex shrink-0 items-center justify-start gap-1.5 whitespace-nowrap rounded-[var(--radius-md)] px-2.5 py-1.5 text-[13px] font-medium transition-colors sm:justify-center ";
  var PILL_BASE = "pointer-events-none absolute rounded-[var(--radius-md)] ";
  var PILL_MOTION = " transition-[left,top,width,background-color] duration-200 ease-out motion-reduce:transition-none";
  var track = $('[role="group"][aria-label="Catalogue"]');
  var pill = track ? $('span[aria-hidden="true"]', track) : null;

  /*
   * The pill's box comes from the selected BUTTON, measured, exactly as the
   * React version does it — offsetLeft/offsetTop against the track, which is the
   * pill's offsetParent.
   *
   * `animate` is false for the two cases where a glide would be wrong: on load,
   * and on a resize. The captured shell carries whatever inline position the
   * grab viewport produced, so without this the pill visibly slides from the
   * wrong place on a window of any other width. The classes go back on the next
   * frame so the very next click still animates.
   */
  function positionPill(activeId, animate) {
    if (!pill || !track) return;
    var j = L.PRIMARY_CATALOGUES.map(function (c) { return c.id; }).indexOf(activeId);
    var btn = $$('[role="group"][aria-label="Catalogue"] button')[j];
    if (!btn) return;
    /* Zero means "not laid out": below sm the track sits inside the closed
       Customize panel, where every offset reads 0, and writing that would park
       the pill in the corner. Keep the last real position; the ResizeObserver
       below re-fires the moment the panel opens and the buttons get boxes.
       Mirrors the same guard in CatalogueTabs' measure(). */
    if (!btn.offsetWidth) return;
    pill.className = PILL_BASE + PILL_FILL[activeId] + (animate ? PILL_MOTION : "");
    pill.style.left = btn.offsetLeft + "px";
    pill.style.top = btn.offsetTop + "px";
    pill.style.width = btn.offsetWidth + "px";
    pill.style.height = btn.offsetHeight + "px";
    if (!animate) {
      requestAnimationFrame(function () {
        pill.className = PILL_BASE + PILL_FILL[activeId] + PILL_MOTION;
      });
    }
  }

  function paintCatalogues(activeId, animate) {
    $$('[role="group"][aria-label="Catalogue"] button').forEach(function (b, j) {
      var id = L.PRIMARY_CATALOGUES[j].id;
      var sel = id === activeId;
      b.setAttribute("aria-pressed", String(sel));
      b.className = BTN_BASE + (sel
        ? SELECTED_INK[id]
        : "text-text-secondary hover:bg-[var(--track-hover)] hover:text-text-primary");
      /* The icon inherits in both states, so there is nothing to paint on it —
         it is whatever the button's ink is. */
      var icon = $("svg", b);
      if (icon) icon.setAttribute("class", "size-4 transition-colors");
    });
    positionPill(activeId, animate !== false);
  }

  /* ONE path for both controls: the segmented control on desktop and the phone
     dropdown. Ported from MetaSearchDemo's changeCatalogue, which both of them
     call in the app for the same reason. */
  function selectCatalogue(id) {
    s.catalogueId = id;
    paintCatalogues(s.catalogueId);
    paintMenu(s.catalogueId);
    renderTldBlock();
    if (s.hasSearched) runSearch();
  }

  $$('[role="group"][aria-label="Catalogue"] button').forEach(function (btn, i) {
    btn.addEventListener("click", function () { selectCatalogue(L.PRIMARY_CATALOGUES[i].id); });
  });

  /*
   * THE PHONE DROPDOWN, ported from CatalogueMenu. It renders the same three
   * catalogues as the segmented control and calls the same code path, so the two
   * cannot disagree: both go through selectCatalogue below.
   *
   * The trigger's label, icon colour and accessible name all carry the current
   * value, so all three are repainted on every change. The captured shell ships
   * with the default selected, which is why these strings are here at all.
   */
  var MENU_INK = {
    radix: "text-accent-blue",
    classics: "text-accent-coral",
    fullcat_uk_au: "text-accent-green",
  };
  var MENU_FILL = {
    radix: "bg-accent-blue-deep",
    classics: "bg-accent-coral-deep",
    fullcat_uk_au: "bg-accent-green-deep",
  };
  var menuBtn = $("[data-catalogue-menu]");
  var menuList = menuBtn && document.getElementById(menuBtn.getAttribute("aria-controls"));

  /*
   * THE TRIGGER'S ICON IS CLONED FROM THE LIST, not written out here, and that
   * is the fix for a bug Ansh reported: this function used to set only the
   * icon's CLASS, so picking Radix + Classics recoloured the mark while leaving
   * Radix's shape behind it. The app was always right, because React swaps the
   * component; the artifact kept the first icon forever.
   *
   * Cloning also means the three shapes exist in exactly one place, the rows,
   * which come from the app's own serialised markup. There is no literal here to
   * drift from RadixIcon, GlobeIcon or LayersIcon, which removes a whole
   * category of the drift build.mjs otherwise has to police.
   */
  function paintMenu(activeId) {
    if (!menuBtn) return;
    var cat = L.getCatalogue(activeId);
    var index = L.PRIMARY_CATALOGUES.map(function (c) { return c.id; }).indexOf(activeId);
    var rows = $$("button", menuList);

    /* THE TRIGGER WEARS THE CATALOGUE, fill and ink, which is Ansh's ask: it was
       a slab of --track-face, and in dark that made the heaviest shape on the
       card the one you were least likely to touch. Same pair as the selected chip
       and the selected row, so one catalogue looks the same in all three. */
    menuBtn.className = "flex h-11 items-center gap-1.5 rounded-[var(--radius-cta)] px-3 text-[13px] font-medium transition-colors " +
      MENU_FILL[activeId] + " " + MENU_INK[activeId];

    var source = $("svg", rows[index]);
    var current = $("svg", menuBtn);
    if (source && current) {
      var copy = source.cloneNode(true);
      /* The mark INHERITS now, on the trigger as on the selected row: the ink is
         on the button, so a class here would be the same colour twice and a
         second place for it to drift from. */
      copy.setAttribute("class", "size-4 shrink-0");
      current.replaceWith(copy);
    }

    var label = $("span", menuBtn);
    if (label) label.textContent = cat.label;
    menuBtn.setAttribute("aria-label", "Catalogue: " + cat.label);

    /* Selected rows take the segmented control's own fill and ink, which is
       Ansh's ask that the dropdown match the chips; idle rows keep the track's
       hover. See CatalogueMenu for the two maps. */
    rows.forEach(function (row, j) {
      var id = L.PRIMARY_CATALOGUES[j].id;
      var sel = id === activeId;
      row.setAttribute("aria-pressed", String(sel));
      row.className = "flex h-10 w-full items-center gap-2 rounded-[var(--radius-md)] px-2.5 text-left text-[13px] transition-colors " +
        (sel
          ? MENU_FILL[id] + " font-medium " + MENU_INK[id]
          : "font-normal text-text-secondary hover:bg-[var(--track-hover)] hover:text-text-primary");
      var icon = $("svg", row);
      if (icon) icon.setAttribute("class", "size-4 shrink-0 " + (sel ? "" : MENU_INK[id]));
    });
  }

  function setMenuOpen(open) {
    if (!menuBtn) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuList.hidden = !open;
    var chev = $("svg:last-child", menuBtn);
    if (chev) chev.setAttribute("class", "size-3.5 shrink-0 transition-transform" + (open ? " rotate-180" : ""));
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    $$("button", menuList).forEach(function (row, j) {
      row.addEventListener("click", function () {
        selectCatalogue(L.PRIMARY_CATALOGUES[j].id);
        setMenuOpen(false);
      });
    });
    /* Escape and outside-pointer dismissal, the same contract as InfoTip. */
    document.addEventListener("pointerdown", function (e) {
      if (menuBtn.getAttribute("aria-expanded") === "true" && !menuBtn.parentNode.contains(e.target)) setMenuOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenuOpen(false);
    });
  }

  /* Re-measure without animating: the labels move with the webfont, and the row
     wraps on a narrow screen. ResizeObserver on the track catches both. */
  if (track && typeof ResizeObserver !== "undefined") {
    var ro = new ResizeObserver(function () { positionPill(s.catalogueId, false); });
    ro.observe(track);
    $$('[role="group"][aria-label="Catalogue"] button').forEach(function (b) { ro.observe(b); });
  }

  function wireToggle(id, onChange) {
    var sw = document.getElementById(id);
    var label = $('label[for="' + id + '"]');
    var accent = id === "aisuggest" ? "purple" : "green";
    var paint = function (on) {
      sw.setAttribute("aria-checked", String(on));
      sw.className = "inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors " +
        (on ? (accent === "purple" ? "bg-accent-purple" : "bg-accent-green") : "bg-stroke-strong");
      $("span", sw).className = "ml-0.5 size-3 rounded-full transition-transform " +
        (on ? "translate-x-2.5 " + (accent === "purple" ? "bg-knob-purple" : "bg-knob-green") : "translate-x-0 bg-text-tertiary");
      label.className = "cursor-pointer whitespace-nowrap text-xs font-medium transition-colors group-hover:text-text-primary " +
        /* --color-text-quiet was deleted from globals.css in the WCAG pass and
           Toggle moved to the tertiary tier; an undefined var() computes to
           inherit, so the artifact's OFF label was rendering in the row's
           colour rather than the app's. */
        (on ? "text-text-secondary" : "text-text-tertiary");
    };
    sw.addEventListener("click", function () {
      var next = sw.getAttribute("aria-checked") !== "true";
      paint(next); onChange(next);
    });
    return paint;
  }
  /*
   * THE CUSTOMIZE DISCLOSURE IS GONE, and its wiring with it. The catalogue moved
   * to the dropdown beside the field and the two switches are listed on the card,
   * so there is nothing left to collapse behind a trigger.
   */
  /* renderUnit as well as the re-run: the hint line under the card quotes this
     switch now, and on the landing page there is no search to re-run, so the
     re-run was the only thing repainting it. React gets this for free. */
  var paintAutosuggest = wireToggle("autosuggest", function (v) { s.autosuggest = v; renderUnit(); if (s.hasSearched) runSearch(); });
  var paintAiSuggest = wireToggle("aisuggest", function (v) {
    s.aiSuggest = v;
    if (!v) { s.ai = null; s.isGeneratingAi = false; clearTimeout(timers.ai); }
    if (s.hasSearched) runSearch(); else renderResults();
  });

  /* --------------------------------------------------------------- info tips */
  /*
   * The two (?) triggers, ported from InfoTip. Hover and focus open one, a click
   * pins it, and Escape or an outside pointerdown close it — dismissible,
   * hoverable and persistent, which is what WCAG 1.4.13 asks of content revealed
   * on hover. The listeners are on each WRAPPER, not the button, so moving the
   * pointer onto a panel keeps it open; that is the whole reason the panel is a
   * sibling inside the wrapper rather than a child of the button.
   *
   * Found by [data-infotip] rather than by aria-label text, which is what this
   * matched on when there was only one of them.
   */
  var tipButtons = $$("[data-infotip]");
  tipButtons.forEach(function (btn) {
    var wrap = btn.parentNode;
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    var hover = false, pinned = false;
    /* Only the hero's panel needs this; see the note on clamp() in InfoTip. */
    var clamp = function () {
      if (btn.getAttribute("data-infotip") !== "below") return;
      panel.style.marginLeft = "0px";
      var r = panel.getBoundingClientRect();
      var margin = 8;
      var overRight = r.right - (window.innerWidth - margin);
      var overLeft = margin - r.left;
      var shift = overRight > 0 ? -overRight : overLeft > 0 ? overLeft : 0;
      if (shift) panel.style.marginLeft = Math.round(shift) + "px";
    };
    var paint = function () {
      var open = hover || pinned;
      btn.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
      if (open) clamp();
    };
    wrap.addEventListener("mouseenter", function () { hover = true; paint(); });
    wrap.addEventListener("mouseleave", function () { hover = false; paint(); });
    wrap.addEventListener("focusin", function () { hover = true; paint(); });
    wrap.addEventListener("focusout", function () { hover = false; paint(); });
    wrap.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !(hover || pinned)) return;
      e.stopPropagation();
      hover = false; pinned = false; paint();
    });
    btn.addEventListener("click", function () { pinned = !pinned; paint(); });
    document.addEventListener("pointerdown", function (e) {
      if (pinned && !wrap.contains(e.target)) { pinned = false; paint(); }
    });
    window.addEventListener("resize", function () { if (hover || pinned) clamp(); });
  });

  /* Every other aria-expanded control on the page is a plain disclosure with a
     chevron. The (?)s are not, hence the skip: they have their own handlers above
     and would otherwise get two click listeners fighting over one panel. */
  $$("button[aria-expanded]").forEach(function (btn) {
    if (btn.hasAttribute("data-infotip")) return;
    /* The catalogue dropdown has its own handler too, and two listeners on one
       button cancelled each other out: mine opened the list, this one closed it,
       and aria-expanded came back "false" on every press. */
    if (btn.hasAttribute("data-catalogue-menu")) return;
    var target = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      if (target) target.hidden = !open;
      /* setAttribute, not .className: on an SVG element className is a
         read-only SVGAnimatedString, so the assignment this used to do was a
         silent no-op and the artifact's chevron never flipped while the app's
         did. Found by comparing the two. */
      var chev = $("svg", btn);
      if (chev) chev.setAttribute("class", "size-3.5 transition-transform" + (open ? " rotate-180" : ""));
    });
  });

  /* ------------------------------------------------------------ sticky bar */
  /*
   * Ported from SearchUnit's effect. position: sticky is CSS and already in the
   * captured shell, so all this does is set the attribute the collapse rules in
   * the stylesheet key off. The sentinel is the element before the sticky strip
   * (aria-hidden, zero height); it is found by relation rather than by class,
   * since it carries none.
   */
  /* The nav's CONDENSED height, which is the only one this has to know: the
     strip's natural top is ~400px down the page and the nav thins out within the
     first 16px of scroll, so it is always 48 by the time the bar pins. Three
     things agree on it — the strip's top-12, the observer's rootMargin, and the
     comparison inside it. */
  var NAV_HEIGHT = 48;
  var strip = pane.parentNode;
  var sentinel = strip.previousElementSibling;
  /* The spacer that holds the flow's height constant. See the note on `reserve`
     in SearchUnit: without it the collapse shortens the document, scroll
     anchoring pulls the page up, the sentinel slides back into view and the bar
     un-sticks, forever. Found by a suite that could not click a moving button. */
  var spacer = strip.nextElementSibling;
  var restingHeight = strip.offsetHeight;

  function setStuck(next) {
    if (next === pane.hasAttribute("data-stuck")) return;
    if (next) {
      pane.setAttribute("data-stuck", "");
      /* Read AFTER the attribute lands, so this is the collapsed height. */
      if (spacer) spacer.style.height = Math.max(0, restingHeight - strip.offsetHeight) + "px";
    } else {
      pane.removeAttribute("data-stuck");
      if (spacer) spacer.style.height = "0px";
      restingHeight = strip.offsetHeight;
    }
  }

  if (sentinel && typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver(function (entries) {
      var entry = entries[0];
      /* Off the TOP, not merely out of view: the sentinel is also outside the
         viewport while the unit is below the fold on first paint. */
      /* Against NAV_HEIGHT, not 0: rootMargin moves the observed area's edge
         while boundingClientRect stays in viewport coordinates, so a sentinel at
         y=20 is past the root's top and still has a positive top. Testing
         against 0 left the bar pinned under the nav and never collapsing. */
      setStuck(!entry.isIntersecting && entry.boundingClientRect.top < NAV_HEIGHT);
    }, { threshold: 0, rootMargin: "-" + NAV_HEIGHT + "px 0px 0px 0px" }).observe(sentinel);
  }
  /* The resting height moves with the width and with the Customize panel, so
     re-measure whenever the strip changes size while it is not stuck. */
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(function () {
      if (!pane.hasAttribute("data-stuck")) restingHeight = strip.offsetHeight;
    }).observe(strip);
  }

  /* ------------------------------------------------------------ the nav thins */
  /*
   * Ported from TopNav. The shell is serialised at scroll 0, so it ships with
   * h-16 and no data-condensed, and this swaps both. The height transition is a
   * class in the captured markup, so the shrink animates without anything here.
   *
   * 16px of threshold and an early return on no-change, which together are the
   * artifact's version of React discarding an identical setState: one class
   * write at the threshold rather than one per scroll frame.
   */
  var navEl = $("header");
  var navInner = navEl && navEl.firstElementChild;
  if (navEl && navInner) {
    var onNavScroll = function () {
      var next = window.scrollY > 16;
      if (next === navEl.hasAttribute("data-condensed")) return;
      if (next) {
        navEl.setAttribute("data-condensed", "");
        navInner.classList.remove("h-16");
        navInner.classList.add("h-12");
      } else {
        navEl.removeAttribute("data-condensed");
        navInner.classList.remove("h-12");
        navInner.classList.add("h-16");
      }
    };
    onNavScroll();
    window.addEventListener("scroll", onNavScroll, { passive: true });
  }

  var themeBtn = $(".theme-swap");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.dataset.theme ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      var next = current === "dark" ? "light" : "dark";
      root.classList.add("theme-switching");
      setTimeout(function () { root.classList.remove("theme-switching"); }, 400);
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  renderUnit();
  renderTldBlock();
  /* false: position the pill where the buttons actually are in THIS viewport,
     without gliding there from the grab viewport's numbers. */
  paintCatalogues(s.catalogueId, false);
  paintMenu(s.catalogueId);

  /* READY, and it is for the test harness rather than for anything on the page.
     The markup here is serialised HTML, so every selector a suite waits on
     exists before this file has attached a single listener — a suite that waits
     on the DOM waits on nothing and then clicks inert HTML. The app's tell is a
     React props key on the input; this is the same tell for this side, set once
     the wiring above is done. Cheap, and it removes a whole class of flake that
     otherwise reads as a broken build. */
  document.documentElement.setAttribute("data-view-ready", "");

  /* ------------------------------------------------------------------ live --
     Everything below exists only in the hosted build. The artifact answers
     from a synchronous function, so "the search did not work" is a state its
     view layer has never had to express and every case here was impossible. */

  var inflight = null;

  /* Say what happened and what to do about it, and never apologise. The
     distinction that matters to someone evaluating the API is whose fault it
     is: "the API did not answer" and "this demo is not configured" are very
     different messages to show a partner, and collapsing them into "something
     went wrong" wastes the one piece of information the response carried. */
  var FAILURE_COPY = {
    rate_limited: ["Too many searches", "This demo limits how fast searches can run. Wait a few seconds and try again."],
    offline: ["No connection", "This device is offline. Reconnect and search again."],
    upstream_timeout: ["The search timed out", "The API did not answer within 25 seconds. AI suggestions are the slow path \u2014 turning them off will usually get a result."],
    upstream_unreachable: ["The API did not answer", "The search service could not be reached. Try again in a moment."],
    server_misconfigured: ["This demo is not configured", "No API credential is set for this catalogue, so the search could not be sent. This is a setup problem here, not a problem with the API."],
    unknown_catalogue: ["Unknown catalogue", "The request named a catalogue the server does not recognise."],
    rejected: ["The API refused the search", "The request was rejected. The raw response has the details."],
    malformed: ["The response could not be read", "The API answered with something that was not a search result."],
  };

  function failureBlock(kind) {
    var copy = FAILURE_COPY[kind] || FAILURE_COPY.rejected;
    return '<div class="rounded-[var(--radius-card)] border border-stroke-default bg-card px-5 py-4">' +
      '<p class="text-sm font-semibold text-text-primary">' + copy[0] + '</p>' +
      '<p class="mt-1 text-sm leading-relaxed text-text-secondary">' + copy[1] + '</p>' +
      '</div>';
  }

  /* Calls the proxy and hands back (payload, failureKind). Exactly one of the
     two is ever set. An aborted request calls back with neither, because the
     newer search owns the UI by then and painting anything would be wrong. */
  function liveSearch(args, signal, done) {
    fetch(L.buildRequestUrl(args), { signal: signal, headers: { accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) {
          /* The proxy maps trouble onto its own statuses, so these are ours to
             read: 429 is our own limiter, 504 our timeout, 502 the upstream
             unreachable from the server, 500 a missing token. Anything else is
             the upstream's own status passed through, body and all. */
          return res.json().catch(function () { return {}; }).then(function (body) {
            var kind = body && body.error ? body.error : null;
            if (!kind) {
              kind = res.status === 429 ? "rate_limited"
                : res.status === 504 ? "upstream_timeout"
                : res.status === 502 ? "upstream_unreachable"
                : res.status === 500 ? "server_misconfigured"
                : "rejected";
            }
            done(null, kind);
          });
        }
        return res.json().then(function (payload) {
          /* Shape-checked before it reaches the renderer. Not full validation,
             just enough that an error page arriving as a 200 cannot crash the
             results list on .map. */
          if (!payload || typeof payload !== "object" || !Array.isArray(payload.results)) {
            done(null, "malformed");
            return;
          }
          done(payload, null);
        }, function () { done(null, "malformed"); });
      })
      .catch(function (err) {
        if (err && err.name === "AbortError") return;
        done(null, navigator.onLine === false ? "offline" : "upstream_unreachable");
      });
  }
})();
