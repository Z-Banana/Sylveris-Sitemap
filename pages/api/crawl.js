export const config = { runtime: 'edge' };

const MAX_URLS = 200;
const MAX_DEPTH = 5;  // 从 3 提升到 5，兼顾覆盖率与执行稳定性

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    let path = u.pathname;
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    u.pathname = path;
    return u.toString().toLowerCase();
  } catch { return null; }
}

function sameDomain(url1, url2) {
  try { return new URL(url1).hostname === new URL(url2).hostname; }
  catch { return false; }
}

function isValidPage(url) {
  const skip = ['.pdf','.jpg','.jpeg','.png','.gif','.css','.js','.zip','.rar',
    '.mp4','.mp3','.svg','.ico','.xml','.json','.woff','.woff2','.ttf','.eot',
    '.doc','.docx','.xls','.xlsx'];
  return !skip.some(ext => url.toLowerCase().endsWith(ext));
}

async function fetchPage(url) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SylverisBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(t);
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('text/html')) return null;
    return await res.text();
  } catch { return null; }
}

function extractLinks(html, baseUrl) {
  const links = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const href = m[1].trim();
      if (!href || href.startsWith('#') || href.startsWith('javascript:') ||
          href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('data:')) continue;
      const abs = new URL(href, baseUrl).toString();
      const norm = normalizeUrl(abs);
      if (norm && sameDomain(norm, baseUrl) && isValidPage(norm)) links.push(norm);
    } catch {}
  }
  return [...new Set(links)];
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : '';
}

async function crawlOne(startUrl) {
  const norm = normalizeUrl(startUrl);
  if (!norm) return { urls: [], logs: ['[ERR] Invalid URL: ' + startUrl] };

  const visited = new Set();
  const queue = [{ url: norm, depth: 0 }];
  const results = [];
  const logs = [];

  while (queue.length > 0 && visited.size < MAX_URLS) {
    const batch = queue.splice(0, 5);
    await Promise.all(batch.map(async ({ url: cur, depth }) => {
      if (visited.has(cur) || depth > MAX_DEPTH) return;
      visited.add(cur);

      const html = await fetchPage(cur);
      if (!html) { logs.push('[SKIP] ' + cur); return; }

      const title = extractTitle(html);
      results.push({ url: cur, title: title || cur, status: 200, depth });
      logs.push('[OK] ' + cur);

      if (depth < MAX_DEPTH) {
        const links = extractLinks(html, cur);
        for (const link of links) {
          if (!visited.has(link) && !queue.some(q => q.url === link)) {
            queue.push({ url: link, depth: depth + 1 });
          }
        }
      }
    }));
  }
  return { urls: results, logs };
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { urls } = await req.json();
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: 'URLs array is required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const allResults = [];
    const allLogs = [];

    // 移除了 urls.slice(0, 5) 限制，输入几个就爬取几个
    for (const url of urls) {
      const { urls: res, logs } = await crawlOne(url);
      allResults.push(...res);
      allLogs.push(...logs);
    }

    const seen = new Set();
    const unique = [];
    for (const item of allResults) {
      if (!seen.has(item.url)) { seen.add(item.url); unique.push(item); }
    }

    return new Response(JSON.stringify({
      success: true,
      urls: unique,
      total: unique.length,
      logs: allLogs,
      generatedAt: new Date().toISOString(),
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
}
