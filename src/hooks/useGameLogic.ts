import React, { useState, useCallback, useRef } from 'react';
import { Word, GameState } from '../types/game';
import { validateKoreanWord, sendChatMessage, getHintWords } from '../lib/api';
import { playAudio, scrollToBottom, checkDuplicateWord, checkWordChain, sleep } from '../lib/utils';
import { GAME_CONFIG, AUDIO_CONFIG, MESSAGES } from '../lib/constants';

export const useGameLogic = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [wordId, setWordId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [gameError, setGameError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [lastUserWord, setLastUserWord] = useState<string>("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [hintWords, setHintWords] = useState<string[]>([]);

  const errorSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize error sound
  React.useEffect(() => {
    errorSoundRef.current = new Audio(AUDIO_CONFIG.ERROR_SOUND_PATH);
  }, []);

  const resetConversation = useCallback(() => {
    setWords([]);
    setWordId(0);
    setGameError(null);
    setShowErrorPopup(false);
    setLastUserWord("");
    setGameStarted(false);
    setGameEnded(false);
    setWinner(null);
    setInputValue("");
    setShowHintPopup(false);
    setHintWords([]);
  }, []);

  const showError = useCallback((message: string) => {
    setGameError(message);
    setShowErrorPopup(true);
    playAudio(errorSoundRef.current);
    setTimeout(() => setShowErrorPopup(false), GAME_CONFIG.ERROR_POPUP_DURATION);
  }, []);

  const handleShowHint = useCallback(async () => {
    if (words.length === 0) {
      showError("게임을 시작한 후 힌트를 사용할 수 있습니다.");
      return;
    }

    const lastWord = words[words.length - 1].text;
    const lastChar = lastWord.charAt(lastWord.length - 1);

    try {
      const hints = await getHintWords(lastChar);
      // 이미 사용된 단어들 제외
      const usedWords = words.map(w => w.text);
      const availableHints = hints.filter(word => !usedWords.includes(word));

      setHintWords(availableHints);
      setShowHintPopup(true);
    } catch {
      showError("힌트를 불러올 수 없습니다.");
    }
  }, [words, showError]);

  const closeHintPopup = useCallback(() => {
    setShowHintPopup(false);
    setHintWords([]);
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (text.trim() === "") return;

    const trimmedText = text.trim();

    // Validate word with API
    setLoading(true);
    try {
      const isValidWord = await validateKoreanWord(trimmedText);
      if (!isValidWord) {
        showError(MESSAGES.INVALID_WORD2);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('단어 검증 실패:', error);
      showError(MESSAGES.WORD_VALIDATION_FAILED);
      setLoading(false);
      return;
    }

    // Check word chain rule (after first word)
    if (words.length > 0) {
      const lastWord = words[words.length - 1].text.trim();
      if (!checkWordChain(trimmedText, lastWord)) {
        showError(`'${lastWord.charAt(lastWord.length - 1)}'(으)로 시작하는 단어를 입력해주세요.`);
        return;
      }
    }

    // Check for duplicate words
    if (checkDuplicateWord(trimmedText, words)) {
      showError(MESSAGES.DUPLICATE_WORD);
      return;
    }

    // Clear errors and start game
    setGameError(null);
    setShowErrorPopup(false);

    if (!gameStarted) {
      setGameStarted(true);
    }

    // Add user word
    const userWord: Word = { id: wordId, text: trimmedText, player: "user" };
    const newWords = [...words, userWord];
    setWords(newWords);
    setWordId(id => id + 1);

    scrollToBottom();

    setLoading(true);

    // AI thinking delay
    await sleep(GAME_CONFIG.AI_THINKING_TIME);

    try {
      const lastChar = trimmedText.charAt(trimmedText.length - 1);
      const responseData = await sendChatMessage(trimmedText, lastChar, newWords.map(w => w.text.trim()));

      const aiResponse = responseData.text || "단어 생성 실패";

      if (aiResponse && aiResponse !== "단어 생성 실패" && aiResponse !== "패배!") {
        const aiWord: Word = {
          id: wordId + 1,
          text: aiResponse,
          player: "ai",
        };
        setWords(prev => [...prev, aiWord]);
        setWordId(id => id + 1);
        scrollToBottom();
      } else {
        const defeatWord: Word = {
          id: wordId + 1,
          text: MESSAGES.USER_WIN,
          player: "ai",
        };
        setWords(prev => [...prev, defeatWord]);
        setWordId(id => id + 1);
        setGameEnded(true);
        setWinner("user");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : MESSAGES.WORD_VALIDATION_FAILED;
      const errorWord: Word = {
        id: wordId + 1,
        text: errorMessage,
        player: "ai",
      };
      setWords(prev => [...prev, errorWord]);
      setWordId(id => id + 1);
    } finally {
      setLoading(false);
    }
  }, [words, wordId, gameStarted, showError]);

  const gameState: GameState = {
    words,
    wordId,
    loading,
    inputValue,
    gameError,
    showErrorPopup,
    lastUserWord,
    gameStarted,
    gameEnded,
    winner,
    showHintPopup,
    hintWords,
  };

  return {
    gameState,
    setInputValue,
    handleSend,
    resetConversation,
    handleShowHint,
    closeHintPopup,
  };
};