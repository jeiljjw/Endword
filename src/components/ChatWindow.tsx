import React, { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import Spinner from "./ui/Spinner";
import type { Word, ChatWindowProps } from "../types/game";
import { MESSAGES, STYLES } from "../lib/constants";

interface ExtendedChatWindowProps extends ChatWindowProps {
  showHintPopup: boolean;
  hintWords: string[];
  onShowHint: () => void;
  onCloseHint: () => void;
}

const ChatWindow: React.FC<ExtendedChatWindowProps> = ({
  words,
  onSend,
  loading,
  resetConversation,
  inputValue,
  onInputChange,
  onShowHint,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 항상 스크롤을 최하단으로 유지
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        const element = scrollRef.current;
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    // DOM 업데이트 후 스크롤
    setTimeout(() => {
      scrollToBottom();
      // 추가 보장
      setTimeout(scrollToBottom, 200);
      setTimeout(scrollToBottom, 500);
    }, 50);
  }, [words, loading]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      onInputChange("");

      // 메시지 전송 시 즉시 스크롤 맨 아래로
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 10);
    }
  };

  return (
    <>
      <div
        ref={scrollRef}
        data-scroll-container
        className="flex-1 overflow-y-auto p-4 pb-50"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {words.length === 0 ? (
          <div className="flex flex-1 min-h-[40vh] items-center justify-center">
            <div className="text-center">
              <span className="text-gray-400 text-2xl mb-4 block">🎯</span>
              <span className="text-gray-400 text-xl">{MESSAGES.FIRST_WORD_PROMPT}</span>
            </div>
          </div>
        ) : (
          <div className={STYLES.GRID_LAYOUT}>
            {words.map((word: Word) => (
              <div key={word.id} className="flex justify-center">
                <div className={`px-4 py-2 border-2 rounded-lg text-center font-bold text-base min-w-[80px]
                  ${word.player === "user"
                    ? STYLES.USER_WORD_STYLE
                    : STYLES.AI_WORD_STYLE
                  }`}>
                  {word.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI 작성 중 로딩 UI */}
        {loading && (
          <div className="flex items-center justify-center gap-3 text-red-600 text-lg font-bold animate-fade-in mt-8">
            <Spinner size={28} />
            <span>{MESSAGES.AI_THINKING}</span>
          </div>
        )}
      </div>


      {/* 중앙 입력 카드 */}
      <div className="w-full max-w-lg fixed bottom-0 left-1/2 -translate-x-1/2 pb-8 flex flex-col items-center z-10">
        <div className="w-full bg-white rounded-3xl shadow-xl px-2 sm:px-8 py-5 flex flex-col items-center">
          <div className="w-full flex items-center gap-2">
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm border bg-blue-100 hover:bg-blue-200 transition flex-shrink-0"
              onClick={onShowHint}
              type="button"
              title="힌트 보기"
              disabled={loading}
            >
              <span className="text-xl font-bold text-blue-600">💡</span>
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm border bg-red-100 hover:bg-red-200 transition flex-shrink-0"
              onClick={resetConversation}
              type="button"
              title="게임 재시작"
            >
              <span className="text-xl font-bold text-red-600">🔄</span>
            </button>
            <div className="flex-grow min-w-0">
              <MessageInput
                value={inputValue}
                onChange={onInputChange}
                onSend={handleSendMessage}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-gray-400 text-sm text-center">
          : 한국기초사전 명사만 사용 • 끝말잇기 규칙 준수
        </div>
      </div>
    </>
  );
};

export default ChatWindow;