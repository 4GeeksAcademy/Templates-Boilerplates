import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Only the public website files are served. Everything else in the repository
// (AGENTS.md, CONTEXT.md, memory-bank/, .git/, data/, etc.) stays private.
const PUBLIC_FILES = new Set([
  '/index.html',
  '/application.html',
  '/privacy.html',
  '/cookies.html',
  '/terms.html',
  '/validation.js',
  '/translations.js',
  '/imagen-hero.jpg'
]);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' });
    res.end('405 Method Not Allowed');
    return;
  }

  const { pathname } = new URL(req.url, 'http://localhost');
  const requested = pathname === '/' ? '/index.html' : pathname;

  if (!PUBLIC_FILES.has(requested)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  fs.readFile(path.join(__dirname, requested), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      return;
    }
    const mimeType = MIME_TYPES[path.extname(requested).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`TrackFlow web en ejecución: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ El puerto ${PORT} ya está en uso`);
    process.exit(1);
  } else {
    throw err;
  }
});
