export const GAME_CONFIG = {
  MIN_WORD_LENGTH: 2,
  MAX_WORD_LENGTH: 10,
  AI_THINKING_TIME: 2000,
  ERROR_POPUP_DURATION: 3000,
  SCROLL_DELAY: 100,
} as const;

export const AUDIO_CONFIG = {
  ERROR_SOUND_PATH: '/sound/x BGM.mp3',
} as const;

export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  WORD_VALIDATION: '/api/chat',
} as const;

export const MESSAGES = {
  FIRST_WORD_PROMPT: '첫 단어를 입력하세요!',
  AI_THINKING: 'AI가 단어를 생각하는 중...',
  AI_THINKING_POPUP: 'AI가 생각하는 중...',
  USER_WIN: '축하합니다! 사용자가 승리했습니다!',
  AI_WIN: 'AI가 승리했습니다!',
  GAME_OVER: '게임 종료!',
  NEW_GAME: '새 게임 시작',
  INVALID_WORD: '오류발생',
  INVALID_WORD2: '등록되지 않은 단어입니다!',
  DUPLICATE_WORD: '이미 사용된 단어입니다!',
  WORD_LENGTH_ERROR: '단어 길이는 2글자 이상 10글자 이하여야 합니다.',
  KOREAN_ONLY_ERROR: '한글 단어만 입력할 수 있습니다.',
  REPEATED_CHARS_ERROR: '반복되는 글자만 있는 단어는 사용할 수 없습니다.',
  WORD_VALIDATION_FAILED: '단어 검증에 실패했습니다. 잠시 후 다시 시도해주세요.',
  NO_SPEECH_SUPPORT: '이 브라우저는 음성 인식을 지원하지 않습니다.',
} as const;

export const STYLES = {
  GRID_LAYOUT: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4',
  USER_WORD_STYLE: 'border-blue-500 bg-blue-50 text-blue-700',
  AI_WORD_STYLE: 'border-red-500 bg-red-50 text-red-700',
} as const;