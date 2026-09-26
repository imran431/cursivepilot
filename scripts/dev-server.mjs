import './build.mjs';
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 8888);
const types = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.svg':'image/svg+xml', '.png':'image/png', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.json':'application/json; charset=utf-8',
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\\/g, '/');
  const resolved = path.resolve(root, `.${clean}`);
  return resolved.startsWith(root) ? resolved : null;
}

const server = http.createServer(async (req, res) => {
  try {
    let file = safePath(req.url || '/');
    if (!file) throw new Error('Invalid path');
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = path.join(file, 'index.html');
    } catch {
      if (!path.extname(file)) file = path.join(file, 'index.html');
    }
    let body;
    try { body = await readFile(file); }
    catch { res.statusCode = 404; body = await readFile(path.join(root, '404.html')); file = path.join(root, '404.html'); }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    res.end(body);
  } catch {
    res.statusCode = 500; res.end('Server error');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local site: http://127.0.0.1:${port}`));
