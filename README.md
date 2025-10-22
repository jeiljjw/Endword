# 끝말잇기 게임 🎯

한국어 끝말잇기 게임! 국립국어원 사전을 활용한 단어 검증과 AI와의 실시간 대결을 즐겨보세요.

- 국립국어원 사전을 통한 정확한 단어 검증
- AI와 실시간 끝말잇기 대결
- 힌트 기능으로 게임 전략 지원
- 반응형 디자인으로 모바일/데스크톱 모두 지원
- Next.js 기반 웹 애플리케이션

## 주요 기능
- 실시간 끝말잇기 게임 플레이
- 국립국어원 API를 통한 단어 검증 (명사만 허용)
- AI 상대와의 자동 대결
- 힌트 버튼으로 다음 단어 아이디어 제공
- 게임 재시작 및 결과 표시
- 오류 처리 및 사용자 피드백

## 게임 방법

1. **게임 시작**: 첫 번째 단어를 입력하세요
2. **규칙 준수**:
   - 국립국어원에 등록된 명사만 사용 가능
   - 끝말잇기 규칙 준수 (이전 단어의 마지막 글자로 시작)
   - 이미 사용한 단어는 사용할 수 없음
3. **힌트 활용**: 💡 버튼을 눌러 다음 단어 아이디어를 확인하세요
4. **승패 결정**: AI가 단어를 찾지 못하면 플레이어 승리!

## 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 환경 변수 설정

### 국립국어원 API 키 발급
1. [국립국어원 개발자 센터](https://krdict.korean.go.kr/openApi/openApiInfo)에 접속
2. API 키 신청 및 발급
3. 프로젝트 루트에 `.env.local` 파일 생성:

```
KOREAN_DICT_API_KEY=your_api_key_here
```

### 배포 환경
Vercel, Netlify 등 호스팅 서비스의 환경 변수 설정에서 `KOREAN_DICT_API_KEY`를 추가하세요.

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **API**: 국립국어원 한국어 기초 사전 API
- **Deployment**: Vercel (권장)

## 폴더 구조

```
src/
├── app/
│   ├── api/chat/route.ts     # 단어 검증 및 AI 응답 API
│   ├── page.tsx              # 메인 게임 페이지
│   └── layout.tsx            # 앱 레이아웃
├── components/
│   ├── ChatWindow.tsx        # 게임 채팅 인터페이스
│   ├── GamePopups.tsx        # 팝업 컴포넌트들
│   ├── MessageInput.tsx      # 메시지 입력 컴포넌트
│   └── ui/Spinner.tsx        # 로딩 스피너
├── hooks/
│   └── useGameLogic.ts       # 게임 로직 훅
├── lib/
│   ├── api.ts                # API 호출 함수들
│   ├── constants.ts          # 상수 정의
│   └── utils.ts              # 유틸리티 함수들
└── types/
    └── game.ts               # TypeScript 타입 정의
```

## 게임 규칙 상세

- **단어 길이**: 2-10글자
- **단어 종류**: 국립국어원 등록 명사만 허용
- **특수 규칙**: 반복 글자 단어 제외 (예: ㅋㅋㅋ)
- **힌트 기능**: 현재 단어의 마지막 글자로 시작하는 단어들 표시 (최대 12개)

## 라이선스

MIT License
