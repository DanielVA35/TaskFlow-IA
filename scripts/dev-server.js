import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = process.cwd();
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css' };
createServer(async (req, res) => { const requested = normalize(req.url === '/' ? '/index.html' : req.url); try { const data = await readFile(join(root, requested)); res.writeHead(200, {'Content-Type': types[extname(requested)] || 'text/plain'}); res.end(data); } catch { res.writeHead(404); res.end('Not found'); } }).listen(3000, () => console.log('TaskFlow IA em http://localhost:3000'));
