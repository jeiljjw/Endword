import { Word } from '../types/game';

export const playAudio = (audioElement: HTMLAudioElement | null, resetTime = true) => {
  if (audioElement) {
    if (resetTime) {
      audioElement.currentTime = 0;
    }
    audioElement.play().catch(e => console.log('Audio play failed:', e));
  }
};

export const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior
    });
  }, 100);
};

export const checkDuplicateWord = (word: string, words: Word[]): boolean => {
  return words.some(w => w.text.trim() === word.trim());
};

export const getLastChar = (word: string): string => {
  return word.charAt(word.length - 1);
};

export const checkWordChain = (currentWord: string, lastWord: string): boolean => {
  const lastChar = getLastChar(lastWord);
  return currentWord.charAt(0) === lastChar;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};