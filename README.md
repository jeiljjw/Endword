# Gemmini (잼민이 챗봇)

10대 젊은이들의 말투를 사용하는 AI 챗봇, "Gemmini"!

- 요즘 10대 젊은이(잼민이) 말투로 대답하는 AI 챗봇입니다.
- 친근하고 재미있는 대화를 나눌 수 있습니다.
- Next.js 기반, Gemini API 연동

## 주요 기능
- 실시간 대화형 챗봇 UI
- Gemini API를 통한 자연어 답변 생성
- 10대 젊은이 말투로 친근한 대화
- 답변 생성 중 로딩(스피너) 표시
- 답변 복사, 좋아요/싫어요 피드백
- 음성모드(마이크) 지원 (옵션)

## 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 환경 변수 설정

### 1. API 키 발급
1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. 생성된 API 키를 복사

### 2. 로컬 개발 환경
프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. 배포 환경 (Vercel 등)
호스팅 서비스의 환경 변수 설정에서 `GEMINI_API_KEY`를 추가하세요.

## 폴더 구조
- `src/app/page.tsx` : 메인 챗봇 UI
- `src/app/api/chat/route.ts` : Gemini API 연동 백엔드
- `src/components/ui/Spinner.tsx` : 로딩 스피너

## 라이선스
MIT
