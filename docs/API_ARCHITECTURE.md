# API Architecture — Local vs. Deployed

This project never calls the CoinGecko API directly from the browser. In both environments, the browser talks to a same-origin `/api/coingecko/*` path, and something else attaches the API key server-side. The mechanism differs by environment, but the client code (`src/lib/api/client.ts`) doesn't know or care which one is running underneath it.

## Why not call CoinGecko directly from the browser

CoinGecko explicitly recommends against this. Attaching the `x-cg-demo-api-key` header to a request from the browser is a custom header, which forces the browser to send a CORS preflight (`OPTIONS`) request first. CoinGecko's API doesn't return the CORS headers required to pass that preflight, so **every authenticated request from a browser fails**, consistently — not intermittently. This isn't a config mistake to tune around; it's a hard constraint of their API, and their own docs say to proxy requests through a backend instead.

## Local development

```text
Browser
  |  fetch('/api/coingecko/global')
  v
Vite Dev Server (server.proxy, in vite.config.ts)
  |  rewrites '/api/coingecko/global' -> 'https://api.coingecko.com/api/v3/global'
  |  attaches header: x-cg-demo-api-key: <COINGECKO_API_KEY>
  v
CoinGecko API
```

- Configured entirely inside `vite.config.ts`'s `server.proxy` block.
- The proxy runs inside the Vite dev server's own Node process — it is **not** shipped to the browser, so reading the key here does not leak it into client-side JS.
- Reads the key from **`COINGECKO_API_KEY`** in your local `.env`.
- This is a dev-only mechanism. It has no equivalent when the site is actually deployed — `vite dev`/`server.proxy` doesn't exist in a production build.

## Deployed (Vercel)

```text
Browser
  |  fetch('/api/coingecko/global')
  v
vercel.json rewrite: "/api/(.*)"  ->  "/api/$1"
  |  (matched BEFORE the SPA catch-all, so this never falls through to index.html)
  v
Vercel Serverless Function: api/coingecko/[...path].ts
  |  reconstructs the real CoinGecko URL from the request path + query
  |  attaches header: x-cg-demo-api-key: <COINGECKO_API_KEY>
  |  sets Cache-Control: s-maxage=30, stale-while-revalidate=60
  v
CoinGecko API
```

- The function itself is server-side code running on Vercel's infrastructure — the key never reaches the browser, and DevTools' Network tab only ever shows requests to your own domain.
- Reads the key from **`COINGECKO_API_KEY`** (set in Vercel → Project Settings → Environment Variables, for Production and Preview) — note the different variable name from local dev, see the callout below.
- The `Cache-Control` header is shared across *all* visitors via Vercel's edge cache — a burst of visitors hitting the same endpoint within the cache window is served from cache, not forwarded to CoinGecko again. This protects the Demo key's shared 30-calls/minute quota under concurrent traffic.
- `vercel.json`'s explicit `/api/(.*)` rewrite rule is what guarantees API requests reach this function instead of being swallowed by the SPA fallback rewrite (`/(.*) -> /index.html`) that exists for client-side routing. Order matters here — rewrites are evaluated top-to-bottom, first match wins.


## What changed and why (for context)

Earlier iterations of this proxy attempted:

- Calling CoinGecko directly from the browser with the key attached — blocked by CORS preflight, unconditionally.
- A `vercel.json` rewrite using a negative-lookahead regex (`/((?!api/).*)`) to exclude `/api/*` from the SPA fallback — unreliable in practice, particularly under `vercel dev`.
- Relying on Vercel's documented-but-unverified "filesystem checked before rewrites" implicit behavior — the function showed zero invocations in Vercel's Functions tab despite this, meaning the rewrite was winning regardless of documentation.

The current explicit `/api/(.*) -> /api/$1` rule was adopted specifically because it doesn't depend on any implicit ordering assumption — it's a deterministic, top-of-file, first-match-wins rule that's independently verifiable via the Functions tab's invocation count in Vercel - Deployment/Resources panel.