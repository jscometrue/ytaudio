/**
 * YouTube 백그라운드 오디오 - 통합 서버 (PC + 모바일)
 * 실행: node server.js
 * → PC: http://localhost:3000  |  모바일: 같은 Wi-Fi에서 QR 스캔 또는 주소 입력
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const IS_RENDER = !!process.env.RENDER;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

function getBaseUrl() {
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '');
  return `http://${getLocalIP()}:${PORT}`;
}

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;

  // 모바일 접속용 주소 API
  if (url === '/api/mobile-url' || url === '/api/mobile-url/') {
    const mobileUrl = getBaseUrl();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ url: mobileUrl }));
    return;
  }

  const filePath = path.join(ROOT, path.normalize(url).replace(/^(\.\.(\/|\\|$))+/, ''));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end();
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const baseUrl = getBaseUrl();
  console.log('');
  console.log('  YouTube 백그라운드 오디오 서버');
  console.log('  ==============================');
  console.log('');
  console.log('  접속 주소:   ' + baseUrl);
  if (!IS_RENDER) {
    console.log('  모바일: 같은 Wi-Fi에서 위 주소 입력 또는 QR 코드 스캔');
    console.log('  종료: Ctrl+C');
    const open = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    require('child_process').exec(`${open} http://localhost:${PORT}`, () => {});
  }
  console.log('');
});
