# YouTube 백그라운드 오디오 - 한 번에 실행 (PC + 모바일)
Set-Location $PSScriptRoot
$Host.UI.RawWindow.Title = "YouTube 백그라운드 오디오"

if (Get-Command node -ErrorAction SilentlyContinue) {
  node server.js
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
  python server.py
} else {
  Write-Host "Node.js 또는 Python 이 필요합니다." -ForegroundColor Red
  Write-Host "Node: https://nodejs.org/"
  Write-Host "Python: https://www.python.org/downloads/"
  Read-Host "엔터를 누르면 종료"
}
