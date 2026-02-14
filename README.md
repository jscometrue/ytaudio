# YouTube 백그라운드 오디오

PC와 모바일에서 **화면을 끈 상태에서 유튜브 음성만** 들을 수 있는 PWA입니다.  
**한 번 실행**하면 PC에서 브라우저가 자동으로 열리고, 모바일에서는 **QR 코드 스캔** 또는 주소 입력만 하면 됩니다.

## 서버 없이 독립 실행 (PC 전용)

**완전 무서버**(HTML 파일만 더블클릭해서 여는 방식)는 YouTube 보안·정책 때문에 **불가능**합니다.  
대신 **PC에서는 실행 파일 하나**로 동작하도록 할 수 있습니다.

### Electron 앱으로 실행 (서버를 따로 켤 필요 없음)

앱이 **내부에서만** 웹 서버를 띄우므로, 사용자는 **프로그램만 실행**하면 됩니다.

1. 이 폴더에서 터미널을 열고:
   ```bash
   npm install
   npm start
   ```
2. **ytaudio** 창이 뜨면 그 안에서 바로 사용합니다. (검은 명령 창이나 브라우저를 따로 열 필요 없음)
3. **exe 프로그램으로 만들기 (다른 PC에서도 실행):**
   ```bash
   npm run build
   ```
   실행 후 **`dist\win-unpacked`** 폴더가 생기고, 그 안에 **`ytaudio.exe`** 가 있습니다.  
   - 이 **exe를 더블클릭**하면 앱이 실행됩니다.  
   - 다른 PC에 옮기려면 **`win-unpacked` 폴더 전체**를 복사한 뒤, 그 폴더 안의 **ytaudio.exe** 를 실행하면 됩니다. (설치 과정 없이 바로 실행 가능)

**필요한 것:** [Node.js](https://nodejs.org/) (npm 포함)  
모바일은 여전히 **같은 Wi‑Fi**에서 `http://이 PC의 IP:3000` 으로 접속하면 됩니다. (Electron 앱이 켜져 있는 동안)

## 한 번에 실행 (PC + 모바일, 브라우저 방식)

1. **`start.bat`** 더블클릭 (또는 PowerShell에서 `.\start.ps1`)
2. 브라우저가 자동으로 **http://localhost:3000** 으로 열립니다.
3. PC 화면에 **「모바일에서 접속」** 카드가 보이면, 그 안의 **QR 코드**를 휴대폰으로 스캔하거나, 표시된 주소를 모바일 브라우저에 입력하세요. (같은 Wi‑Fi 필요)
4. 서버를 끌 때는 검은 창에서 **Ctrl+C**

필요한 것: **Node.js** 또는 **Python** 중 하나만 있으면 됩니다.  
(Node가 있으면 `server.js`, 없으면 `server.py`가 자동으로 사용됩니다.)

### 수동 실행

- **Node**: `node server.js`
- **Python**: `python server.py`

실행 후 콘솔에 **PC 접속 주소**와 **모바일 접속 주소**가 함께 표시됩니다.

## 안드로이드에서 앱으로 실행

1. 모바일 브라우저(Chrome 권장)로 접속한 뒤, **주소창 옆 메뉴(⋮) → "앱 설치"** 또는 **"홈 화면에 추가"**를 선택합니다.
2. 설치 후 홈 화면에 생긴 **「YT 오디오」** 아이콘을 눌러 앱처럼 실행합니다.
3. PC에서 접속할 때는 상단 **「앱으로 설치하면 더 편하게 사용할 수 있어요」** 배너의 **설치** 버튼을 눌러도 됩니다.

앱으로 설치하면 전체 화면(standalone)으로 실행되어 백그라운드·잠금 화면 재생에 유리합니다.

## 기능

- **유튜브 검색**: 검색어 입력 후 결과에서 곡을 선택하면 URL 없이 바로 재생 (검색 사용 시 API 키 필요, 설정에서 입력)
- **PC**: 창 최소화·다른 탭으로 가도 오디오만 재생
- **모바일**: 앱 설치 후 홈 화면에서 실행 · 잠금 화면에서 재생/일시정지
- URL 또는 영상 ID 직접 입력으로도 재생 가능
- 재생/일시정지, 구간 이동, 볼륨, 미디어 세션(잠금 화면 정보)

## 파일 구성

| 파일 | 설명 |
|------|------|
| **main.js** | Electron 메인 프로세스 (내장 서버 + 창) – 독립 실행용 |
| **package.json** | npm 스크립트 및 Electron 빌드 설정 |
| **start.bat** / **start.ps1** | 한 번에 실행 (Node 또는 Python 자동 선택) |
| **server.js** | 통합 서버 (Node) – PC IP, /api/mobile-url, 브라우저 자동 열기 |
| **server.py** | 통합 서버 (Python) – Node 없을 때 동일 동작 |
| **index.html** | 메인 앱 + 모바일 접속 안내(QR) |
| **manifest.json** | PWA 설정 |
| **sw.js** | 서비스 워커 |

## 다른 모바일에서 실행하려면 (복사할 파일)

**모바일 기기에는 파일을 복사하지 않습니다.**  
다른 PC에서 서버를 돌리거나, 웹 호스트에 올릴 때 아래만 **같은 폴더에** 복사하면 됩니다.

| 복사 필수 | 파일 |
|-----------|------|
| ✅ | **index.html** |
| ✅ | **manifest.json** |
| ✅ | **sw.js** |
| ✅ | **server.js** (Node 사용 시) 또는 **server.py** (Python 사용 시) |
| 선택 | **start.bat**, **start.ps1** (실행 편의용) |
| 선택 | **README.md** (설명용) |

**최소 복사 (웹 앱만 배포할 때):**  
`index.html`, `manifest.json`, `sw.js`  
→ 이 3개를 웹 서버(또는 Netlify/Vercel 등)의 같은 경로에 두고, 모바일에서는 해당 **URL**로 접속하면 됩니다.

**다른 PC에서 서버까지 실행할 때:**  
위 3개 + **server.js** + **start.bat** (또는 **server.py** + **start.bat**) 를 그 PC의 한 폴더에 복사한 뒤, 그 PC에서 `start.bat` 실행 → 모바일은 같은 Wi‑Fi에서 표시되는 주소(또는 QR)로 접속합니다.

## Render에 배포하기 (클라우드 서버에서 구동)

이 프로젝트를 **Render**에 올리면, PC를 켜 두지 않아도 **항상 접속 가능한 URL**로 서비스를 쓸 수 있습니다.

### 배포 전 준비 (순서대로)

| 순서 | 할 일 | 설명 |
|------|--------|------|
| **1** | **Render 가입** | [render.com](https://render.com) → **Get Started** → 이메일·비밀번호 또는 GitHub으로 가입. 결제 수단 없이 무료 플랜 사용 가능. |
| **2** | **GitHub 가입** | 아직 없다면 [github.com](https://github.com)에서 가입. Render가 코드를 가져올 저장소가 필요함. |
| **3** | **프로젝트 폴더 확인** | **로컬 PC**의 **YouTube 폴더**(예: `c:\Cursor\YouTube`)가 곧 프로젝트 폴더입니다. 그 폴더를 열고, 안에 `index.html`, `manifest.json`, `sw.js`, `server.js`, `package.json`, `render.yaml` 이 있는지 확인. |
| **4** | **Git 설치** | **로컬 PC**에 Git이 없다면 [git-scm.com](https://git-scm.com) 에서 다운로드 후 설치. 설치 후 터미널에서 `git --version` 입력해 설치 여부 확인. |
| **5** | **GitHub 저장소 만들기** | **(Git 설치 다음 단계)** GitHub 로그인 → 우측 상단 **+** → **New repository** → 저장소 이름 입력(예: `ytaudio`) → **Create repository**. (README 추가 안 해도 됨) |
| **6** | **코드를 GitHub에 올리기** | **같은 로컬 폴더**에서 터미널(또는 PowerShell)을 열고 아래 명령 실행. (저장소 주소는 본인 것으로 바꿀 것) |
| **7** | **Render에서 서비스 생성** | Render 대시보드 → **New +** → **Web Service** → GitHub 저장소 연결 → 설정 입력 → **Create Web Service** |
| **8** | **배포 완료 대기** | 첫 배포에 3~5분 정도 걸림. 완료되면 표시되는 **URL**로 접속. |

### Git 설치 방법 (Windows 기준)

1. **다운로드**  
   [https://git-scm.com/download/win](https://git-scm.com/download/win) 접속 후, **64-bit Git for Windows Setup** (또는 본인 PC에 맞는 버전) 다운로드.

2. **설치 실행**  
   다운로드한 설치 파일(예: `Git-2.xx.x-64-bit.exe`)을 더블클릭해 실행.

3. **설치 옵션**  
   대부분 **Next**만 눌러도 됨.  
   - **PATH** 선택 화면이 나오면 **"Git from the command line and also from 3rd-party software"** 를 선택해 두면 터미널에서 `git` 명령을 바로 쓸 수 있음.  
   - **기본 편집기**는 그대로 두거나 **Notepad** 등 원하는 것으로 선택.

4. **설치 완료**  
   **Finish** 클릭 후, **새 터미널(또는 PowerShell) 창**을 연다.

5. **설치 확인**  
   터미널에서 아래 입력 후 엔터. 버전 번호가 나오면 설치된 것.
   ```bash
   git --version
   ```
   예: `git version 2.43.0.windows.1`

**`git --version` 이 안 나올 때 (PATH 설정)**

Git이 설치됐는데 터미널에서 `git`을 찾지 못하면, **PATH에 Git 경로를 넣어야** 합니다.

**방법 A – PowerShell로 추가 (권장)**  
PowerShell을 **관리자 권한**으로 연 뒤 아래를 **한 줄씩** 실행합니다.

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\Git\cmd", "User")
```

실행 후 **터미널을 모두 닫았다가 다시 열고** `git --version` 을 입력해 보세요.

**방법 B – 수동으로 PATH 추가**  
1. **Windows 키** 누르고 `환경 변수` 검색 → **시스템 환경 변수 편집** 실행  
2. **환경 변수** 버튼 클릭  
3. **사용자 변수**에서 **Path** 선택 → **편집**  
4. **새로 만들기** 클릭 후 아래 중 설치된 경로 하나 입력:
   - `C:\Program Files\Git\cmd`
   - 또는 `C:\Program Files (x86)\Git\cmd`  
5. **확인**으로 모두 닫은 뒤, **터미널(또는 Cursor)을 다시 연다.**  
6. `git --version` 입력해 확인.

(Mac: [git-scm.com/download/mac](https://git-scm.com/download/mac) 에서 설치. Linux: `sudo apt install git` (Ubuntu) 등.)

### 6단계: 터미널에서 실행할 명령

**먼저 Git 사용자 정보 설정 (최초 1회)**  
`git commit` 시 "Please tell me who you are" 가 나오면, 아래를 **본인 정보**로 바꿔 실행한 뒤 다시 `git commit` 하세요.

```bash
git config --global user.name "본인이름"
git config --global user.email "본인이메일@example.com"
```

예: `git config --global user.name "Hong Gildong"` , `git config --global user.email "hong@gmail.com"`

**이후 프로젝트 폴더**(YouTube 폴더)에서:

```bash
git init
git add .
git commit -m "ytaudio for Render"
git branch -M main
git remote add origin https://github.com/당신아이디/저장소이름.git
git push -u origin main
```

**git commit 다음 할 일 (같은 6단계):**  
① `git branch -M main` → ② `git remote add origin (저장소URL)` → ③ `git push -u origin main`  
(저장소 URL은 GitHub에서 만든 저장소 페이지의 **Code** 버튼에서 복사)

**git push 다음 할 일 (7단계):** Render 대시보드에서 Web Service 생성 → 아래 "7단계: Render 설정 값" 참고.

- **당신아이디**: GitHub 로그인 아이디. **저장소이름**: 5단계에서 New repository 만들 때 입력한 이름(예: `ytaudio`). 둘 다 본인 GitHub 저장소에 맞게 바꾸세요.
- GitHub 최초 푸시 시 로그인 창이 뜨면 로그인하거나, **Personal Access Token**을 비밀번호 자리에 넣어야 할 수 있습니다.

### 7단계: Render 설정 값

| 항목 | 입력 값 |
|------|---------|
| **Name** | `ytaudio` (원하는 이름) |
| **Region** | 가까운 지역 (예: Singapore) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | **Free** |

**Create Web Service** 클릭 후 배포가 시작됩니다.

### Render 빌드가 끝나면 (다음 할 일)

| 순서 | 할 일 |
|------|--------|
| 1 | Render 대시보드에서 **상단에 표시된 URL** 확인 (예: `https://ytaudio.onrender.com`) |
| 2 | **PC**: 브라우저에서 해당 URL 열어서 앱이 정상 열리는지 확인 |
| 3 | **URL 저장**: 주소창 주소를 북마크하거나 메모해 두기 (나중에 접속할 때 사용) |
| 4 | **모바일**: 같은 URL을 휴대폰 브라우저에 입력해 접속 → 필요하면 **홈 화면에 추가**로 앱처럼 사용 |
| 5 | (선택) 코드 수정 후 다시 배포하려면 로컬에서 `git add .` → `git commit -m "메시지"` → `git push` 하면 Render가 자동으로 다시 빌드·배포함 |

- 무료 플랜은 **15분 동안 접속이 없으면** 서버가 잠들고, 다음 접속 시 **최대 1분** 정도 뒤에 다시 켜집니다.

### Render 빌드 오류가 날 때

**"Running 'node main.js'" 로 실패하는 경우**

- **원인**: Start Command가 `node main.js` 로 되어 있음. `main.js`는 **Electron(PC 앱)** 용이라 서버(Render)에서는 동작하지 않음. 서버는 **`node server.js`** 로 실행해야 함.
- **조치**: Render 대시보드 → 해당 서비스 → **Settings** → **Start Command** 를 **`node server.js`** 로 바꾼 뒤 **Save** → **Manual Deploy** → **Deploy latest commit**.

**그 외 빌드 실패**

- **조치 1**: **Build Command** 를 `npm install --omit=dev` 로 설정 (Electron 제외).
- **조치 2**: **Start Command** 가 반드시 **`node server.js`** 인지 확인.
- **그래도 실패하면**: **Logs** 탭의 에러 메시지 확인.

## 향후 프로그램 업데이트 절차

### 수정 내용을 배포에 적용하는 순서 (한눈에)

| 순서 | 할 일 |
|------|--------|
| 1 | **로컬에서 파일 수정** (예: `index.html`, `server.js` 등) |
| 2 | **YouTube 폴더**에서 **`update-render.bat`** 더블클릭 (또는 아래 수동 명령 실행) |
| 3 | 나오는 창에서 **커밋 메시지** 입력 (예: `검색 최신순 적용`) 후 Enter, 또는 그냥 Enter로 기본 메시지 사용 |
| 4 | 푸시가 끝날 때까지 대기 |
| 5 | **Render**가 자동으로 재빌드·재배포 (몇 분 소요). 대시보드 **Logs**에서 상태 확인 |
| 6 | 같은 **접속 URL**로 들어가 수정 반영 여부 확인 |

**수동으로 할 때:** 2단계 대신 터미널에서 `git add .` → `git commit -m "메시지"` → `git push` 실행.

### Render(웹) 업데이트 (상세)

**간단 방법 – 배치 파일 사용**  
YouTube 폴더에 **`update-render.bat`** 이 있습니다. 수정 후 이 파일을 **더블클릭**하면 `git add` → `git commit` → `git push` 가 순서대로 실행되어 Render에 자동 반영됩니다. 실행 시 커밋 메시지를 입력하거나 Enter만 눌러 기본 메시지(`Update`)로 올릴 수 있습니다.

**수동 실행 시**

| 순서 | 할 일 |
|------|--------|
| 1 | **로컬에서 수정** – YouTube 폴더의 `index.html`, `server.js` 등 원하는 파일 편집 |
| 2 | **터미널**을 프로젝트 폴더(YouTube)에서 연다 |
| 3 | `git add .` |
| 4 | `git commit -m "업데이트 내용 요약"` (예: `git commit -m "검색 UI 개선"`) |
| 5 | `git push` |
| 6 | **Render**가 자동으로 새 커밋을 감지해 **재빌드·재배포**함. 대시보드 **Logs**에서 진행 상황 확인 |
| 7 | 배포가 끝나면 **같은 URL**로 접속 시 수정된 내용이 반영됨 |

(자동 배포가 꺼져 있다면 Render 대시보드에서 **Manual Deploy** → **Deploy latest commit** 실행)

### PC용 exe(ytaudio.exe) 다시 만들기

코드 수정 후 **실행 파일만 새로 만들고 싶을 때**:

1. 로컬에서 수정 후 (위 1~5 단계로 `git push` 까지 해도 됨)
2. 같은 폴더에서 터미널 실행: `npm run build`
3. **`dist\win-unpacked\ytaudio.exe`** 가 새로 생성됨. 이 폴더 전체를 배포용으로 사용

### 정리

- **웹(Render)만 업데이트** → 로컬 수정 → `git add .` → `git commit -m "메시지"` → `git push`
- **exe만 다시 만들기** → `npm run build` 후 `dist\win-unpacked` 사용
- **둘 다** → 수정 후 `git push` 하고, PC용이 필요하면 `npm run build` 추가로 실행

## 개인용 무료 클라우드·호스팅 (이 앱 배포용)

이 앱(HTML+JS 정적 파일)을 **항상 켜 둔 서버 없이** 인터넷에서 접속하게 하려면, 아래 같은 **무료 호스팅**에 올리면 됩니다. (대부분 결제 수단 없이 가입만으로 사용 가능)

| 서비스 | 특징 | 링크 |
|--------|------|------|
| **Vercel** | 정적/Node 배포, GitHub 연동 시 자동 배포, HTTPS·CDN 기본 | [vercel.com](https://vercel.com) |
| **Netlify** | 정적 사이트·폴더 드래그로 배포, 폼·리다이렉트 등 설정 쉬움 | [netlify.com](https://netlify.com) |
| **Cloudflare Pages** | 정적 사이트, Git 연동 또는 직접 업로드, 전 세계 CDN | [pages.cloudflare.com](https://pages.cloudflare.com) |
| **GitHub Pages** | GitHub 저장소 기반 정적 호스팅, 무료, `username.github.io` 등 | [pages.github.com](https://pages.github.com) |
| **Render** | 정적 사이트 + 무료 백엔드(서버) 옵션, 소규모 프로젝트에 적합 | [render.com](https://render.com) |
| **Railway** | 앱·DB 등 배포, 월 무료 크레딧 제공 (과금 전환 가능) | [railway.app](https://railway.app) |
| **Google Firebase Hosting** | 정적 호스팅, Google 계정으로 배포, CLI로 간단 배포 | [firebase.google.com](https://firebase.google.com/products/hosting) |

**이 프로젝트(ytaudio)에 쓰기 좋은 것:**  
- **정적 파일만** 올리면 될 때 → **Vercel, Netlify, Cloudflare Pages, GitHub Pages** 중 하나에 `index.html`, `manifest.json`, `sw.js` (필요 시 `server.js` 없이) 업로드 또는 Git 푸시 후 배포하면 됩니다.  
- **Node 서버(server.js)** 도 24시간 돌리고 싶다면 → **Render** 또는 **Railway** 무료 플랜을 사용할 수 있으나, 무료 한도·슬립(유휴 시 중지) 정책을 확인하는 것이 좋습니다.

(각 서비스의 무료 한도·정책은 사이트에서 최신 내용을 확인하세요.)

## 검색 기능 (YouTube API 키)

검색을 사용하려면 **설정(⚙️)** 에서 **YouTube Data API v3** 키를 한 번 입력해 저장하면 됩니다.

**API 키 비용:** **무료**입니다.  
Google에서 하루 **약 1만 단위**를 무료로 제공하며, 검색 1회 = 100 단위라 **하루 약 100번 검색**까지 무료입니다. 개인 사용이라면 유료 결제 없이 사용할 수 있고, 결제 수단 등록 없이도 키 발급·사용이 가능합니다. (초과 시에만 유료 전환 가능)

### 사이트에서 API 키 발급 방법

1. **Google Cloud Console 접속**  
   브라우저에서 **[https://console.cloud.google.com](https://console.cloud.google.com)** 접속 후, Google 계정으로 로그인합니다.

2. **프로젝트 만들기(또는 선택)**  
   - 상단 **프로젝트 선택** 클릭 → **새 프로젝트** → 이름 입력(예: `ytaudio`) → **만들기**  
   - 이미 만든 프로젝트가 있으면 해당 프로젝트를 선택해도 됩니다.

3. **YouTube Data API v3 사용 설정**  
   - 왼쪽 메뉴 **API 및 서비스** → **라이브러리**  
   - 검색창에 **YouTube Data API v3** 입력 → **YouTube Data API v3** 선택  
   - **사용** 버튼 클릭

4. **API 키 만들기**  
   - 왼쪽 메뉴 **API 및 서비스** → **사용자 인증 정보**  
   - **+ 사용자 인증 정보 만들기** → **API 키** 선택  
   - 생성된 API 키가 팝업에 표시됩니다. **복사** 버튼으로 키를 복사합니다.

5. **앱에 키 입력**  
   - ytaudio 앱에서 **⚙️ 설정** 클릭 → **API 키** 입력란에 복사한 키 붙여넣기 → **저장**

(키는 기기 브라우저 저장소에만 저장되며, 검색 요청 시에만 사용됩니다.)

## 유의사항

- 모바일에서 화면이 꺼지면 재생이 멈출 수 있는 기기가 있습니다. 잠금 화면에서 다시 재생하면 됩니다.
- YouTube IFrame API·Data API를 사용하며, 이용 약관 범위 내에서 사용하세요.
