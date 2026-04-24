# Google Sheets + Drive 연동 플랜

## 목표
Google Sheets를 입력 대시보드로 사용하여 인허가 블로그 글을 일괄 생성하고, 결과를 시트에 기록 + Google Drive에 .html 파일로 저장

## 흐름

```
[Google Sheets]                    [Next.js API]              [Google Drive]
┌─────────────────────────┐       ┌──────────┐       ┌──────────────────┐
│ A: 업종명               │──────→│ /api/    │──────→│ 생성된글/        │
│ B: 참고자료             │ 호출  │ generate │ 저장  │  ├ 공장등록.html  │
│ C: 필수포함문구         │       └──────────┘       │  ├ 파견업.html    │
│ D: 추가메모             │                          │  └ ...            │
│ E: 본문4포함 (Y/N)      │                          └──────────────────┘
│ ─── 여기부터 자동 ───   │
│ F: 생성상태 (대기/완료)  │◀─── 결과 기록
│ G: 제목 (결과)          │
│ H: 글자수               │
│ I: 본문 링크 (Drive)    │
└─────────────────────────┘
```

## 사전 준비

1. Google Cloud Console에서 프로젝트 생성
2. Google Sheets API + Google Drive API 활성화
3. OAuth 2.0 클라이언트 ID 생성 (웹 애플리케이션)
4. 리다이렉트 URI: `http://localhost:3001/api/auth/callback/google`

## 구현 항목

### 1단계: Google OAuth 연동
- `next-auth` 또는 `googleapis` + 직접 OAuth 구현
- Google 로그인 → 토큰 저장 (세션/쿠키)
- 필요 스코프:
  - `https://www.googleapis.com/auth/spreadsheets`
  - `https://www.googleapis.com/auth/drive.file`

### 2단계: Sheets 읽기/쓰기 API
- `POST /api/sheets/import` — 시트 URL 입력 → 행 데이터 읽기 (A~E열)
- `POST /api/sheets/export` — 생성 결과를 시트에 기록 (F~I열)
- 시트 연결 시 스프레드시트 ID + 시트명 저장

### 3단계: Drive 파일 저장 API
- `POST /api/drive/save` — 생성된 HTML을 .html 파일로 Drive에 저장
- 지정 폴더에 저장 (폴더 없으면 자동 생성)
- 저장 후 공유 링크 반환 → 시트 I열에 기록

### 4단계: UI 확장
- 설정 페이지: Google 계정 연결, 시트 URL 입력, Drive 폴더 지정
- 메인 페이지에 "시트에서 불러오기" 버튼 추가
- 불러온 행 목록 표시 → 개별 생성 or 일괄 생성
- 생성 완료 시 "시트에 저장" + "Drive에 저장" 버튼

### 5단계: 일괄 생성 모드
- 시트에서 "생성상태 = 대기"인 행만 필터
- 순차 생성 (Claude API rate limit 고려)
- 진행률 표시 (1/10, 2/10...)
- 각 행 완료 시 즉시 시트에 결과 기록

## 추가 패키지
- `googleapis` — Google Sheets/Drive API
- `next-auth` — OAuth 인증 (선택)

## 환경변수 추가
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/callback/google
```

## 시트 템플릿 컬럼 구조

| 열 | 필드명 | 입력/출력 | 설명 |
|---|---|---|---|
| A | 업종명 | 입력 (필수) | 예: 공장등록 |
| B | 참고자료 | 입력 (선택) | 법률 조문, 요건 정보 등 |
| C | 필수포함문구 | 입력 (선택) | 예: 인허가닷컴, 무료 상담 |
| D | 추가메모 | 입력 (선택) | 특별 요청사항 |
| E | 본문4포함 | 입력 (선택) | Y 또는 N (기본 N) |
| F | 생성상태 | 출력 | 대기/생성중/완료/실패 |
| G | 제목 | 출력 | AI 생성 제목 |
| H | 글자수 | 출력 | 생성된 글자수 |
| I | Drive 링크 | 출력 | 저장된 .html 파일 링크 |
