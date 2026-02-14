@echo off
cd /d "%~dp0"
title YouTube 백그라운드 오디오

where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.js
  goto :eof
)

where python >nul 2>nul
if %errorlevel% equ 0 (
  python server.py
  goto :eof
)

echo Node.js 또는 Python 이 필요합니다.
echo Node: https://nodejs.org/
echo Python: https://www.python.org/downloads/
pause
