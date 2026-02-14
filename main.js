/**
 * Electron 메인 프로세스
 * 앱 실행 시 내장 HTTP 서버를 띄우고 창을 연다. 사용자는 서버를 따로 실행할 필요 없음.
 */
const { app, BrowserWindow } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const ROOT = __dirname;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
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

let mainWindow = null;
let server = null;

function createServer() {
  return new Promise((resolve) => {
    server = http.createServer((req, res) => {
      const url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
      if (url === '/api/mobile-url' || url === '/api/mobile-url/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ url: `http://${getLocalIP()}:${PORT}` }));
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
          res.writeHead(err.code === 'ENOENT' ? 404 : 500);
          res.end(err.code === 'ENOENT' ? 'Not Found' : 'Server Error');
          return;
        }
        res.setHeader('Content-Type', mime[path.extname(filePath)] || 'application/octet-stream');
        res.end(data);
      });
    });
    server.listen(PORT, '0.0.0.0', () => resolve());
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 720,
    minWidth: 360,
    minHeight: 500,
    title: 'ytaudio',
    backgroundColor: '#0f0f0f',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadURL(`http://localhost:${PORT}`);
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(async () => {
  await createServer();
  createWindow();
  app.on('window-all-closed', () => {
    if (server) server.close();
    app.quit();
  });
});

app.on('before-quit', () => {
  if (server) server.close();
});
