import type { VercelRequest, VercelResponse } from '@vercel/node';

const COINGECKO_BASE_URL = process.env.COINGECKO_API_BASE_URL || 'https://api.coingecko.com/api/v3';
const CACHE_SECONDS = 30;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const requestUrl = new URL(req.url ?? '', 'http://localhost');
  const pathSegments = requestUrl.pathname.replace(/^\/api\/coingecko\/?/, '');
  const search = requestUrl.search; // includes leading "?" already, or empty string

  const targetUrl = `${COINGECKO_BASE_URL}/${pathSegments}${search}`;

  const apiKey = process.env.COINGECKO_API_KEY;

  try {
    const upstream = await fetch(targetUrl, {
      headers: {
        Accept: 'application/json',
        ...(apiKey ? { 'x-cg-demo-api-key': apiKey } : {}),
      },
    });

    const body = await upstream.text();

    res.setHeader(
      'Cache-Control',
      `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`
    );
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json');
    res.send(body);
  } catch (error) {
    res.status(502).json({ message: 'Failed to reach CoinGecko', error: String(error) });
  }
}
