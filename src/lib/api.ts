import { ValidationResult } from '../types/game';
import { API_ENDPOINTS, GAME_CONFIG } from './constants';

export const validateKoreanWord = async (word: string): Promise<boolean> => {
  try {
    console.log(`단어 검증 요청: ${word}`);

    const response = await fetch(`${API_ENDPOINTS.WORD_VALIDATION}?word=${encodeURIComponent(word)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('단어 검증 API 호출 실패:', response.status);
      return false;
    }

    const result: ValidationResult = await response.json();
    console.log(`단어 "${word}" 검증 결과:`, result);

    return result.isValid;
  } catch (error) {
    console.error('단어 검증 중 오류:', error);
    return false;
  }
};

export const sendChatMessage = async (
  message: string,
  lastChar: string,
  usedWords: string[]
) => {
  const res = await fetch(API_ENDPOINTS.CHAT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      lastChar,
      usedWords
    }),
  });

  if (!res.ok) {
    const responseData = await res.json();
    throw new Error(responseData.error || "서버 오류가 발생했습니다.");
  }

  return await res.json();
};

export const getHintWords = async (lastChar: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.WORD_VALIDATION}?action=hint&lastChar=${encodeURIComponent(lastChar)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('힌트 API 호출 실패:', response.status);
      return [];
    }

    const result = await response.json();
    return result.hintWords || [];
  } catch (error) {
    console.error('힌트 단어 가져오기 중 오류:', error);
    return [];
  }
};

export const basicWordValidation = (word: string): ValidationResult => {
  if (word.length < GAME_CONFIG.MIN_WORD_LENGTH || word.length > GAME_CONFIG.MAX_WORD_LENGTH) {
    return {
      isValid: false,
      reason: '단어 길이는 2글자 이상 10글자 이하여야 합니다.'
    };
  }

  if (!/^[가-힣]+$/.test(word)) {
    return {
      isValid: false,
      reason: '한글 단어만 입력할 수 있습니다.'
    };
  }

  if (/^(.)\1+$/.test(word)) {
    return {
      isValid: false,
      reason: '반복되는 글자만 있는 단어는 사용할 수 없습니다.'
    };
  }

  return { isValid: true };
};