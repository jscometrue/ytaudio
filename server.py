# -*- coding: utf-8 -*-
"""
YouTube 백그라운드 오디오 - 통합 서버 (PC + 모바일)
실행: python server.py
Node가 없을 때 사용. server.js와 동일하게 /api/mobile-url 제공.
"""
import socket
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

PORT = 3000
ROOT = os.path.dirname(os.path.abspath(__file__))


def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        if self.path in ("/api/mobile-url", "/api/mobile-url/"):
            url = "http://{}:{}".format(get_local_ip(), PORT)
            body = json.dumps({"url": url}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", len(body))
            self.end_headers()
            self.wfile.write(body)
            return
        return SimpleHTTPRequestHandler.do_GET(self)

    def log_message(self, format, *args):
        pass  # 콘솔 로그 간소화


def main():
    ip = get_local_ip()
    mobile_url = "http://{}:{}".format(ip, PORT)
    pc_url = "http://localhost:{}".format(PORT)

    print("")
    print("  YouTube 백그라운드 오디오 서버")
    print("  ==============================")
    print("")
    print("  PC 접속:     " + pc_url)
    print("  모바일 접속: " + mobile_url + "  (같은 Wi-Fi)")
    print("")
    print("  모바일에서: 브라우저에 위 주소 입력 또는 PC 화면의 QR 코드 스캔")
    print("  종료: Ctrl+C")
    print("")

    server = HTTPServer(("0.0.0.0", PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n서버를 종료합니다.")


if __name__ == "__main__":
    main()
