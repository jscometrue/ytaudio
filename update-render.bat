@echo off
cd /d "%~dp0"
title Render 업데이트 배포

echo.
echo  [ Render 자동 배포 ]
echo  수정한 내용을 GitHub에 올려 Render에 반영합니다.
echo.

git status -s
if %errorlevel% neq 0 (
  echo  Git이 초기화되지 않았거나 오류가 있습니다. 먼저 git init 및 remote 설정을 완료하세요.
  pause
  exit /b 1
)

echo.
set /p MSG="커밋 메시지를 입력하세요 (Enter 시 'Update' 사용): "
if "%MSG%"=="" set MSG=Update

echo.
echo  실행: git add .
git add .
echo  실행: git commit -m "%MSG%"
git commit -m "%MSG%"
if %errorlevel% neq 0 (
  echo  커밋할 변경 내용이 없거나 오류가 발생했습니다.
  pause
  exit /b 1
)

echo  실행: git push
git push
if %errorlevel% neq 0 (
  echo  push 실패. GitHub 로그인/토큰 또는 remote 주소를 확인하세요.
  pause
  exit /b 1
)

echo.
echo  [ 완료 ] GitHub에 푸시되었습니다. Render에서 자동으로 재배포가 진행됩니다.
echo  Render 대시보드 Logs에서 배포 상태를 확인하세요.
echo.
pause
