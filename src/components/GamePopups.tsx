import React from 'react';
import { MESSAGES } from '../lib/constants';

interface ErrorPopupProps {
  showErrorPopup: boolean;
  gameError: string | null;
}

interface ThinkingPopupProps {
  loading: boolean;
  lastUserWord: string;
}

interface GameEndPopupProps {
  gameEnded: boolean;
  winner: string | null;
  onReset: () => void;
}

interface HintPopupProps {
  showHintPopup: boolean;
  hintWords: string[];
  onClose: () => void;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ showErrorPopup, gameError }) => {
  if (!showErrorPopup || !gameError) return null;

  return (
    <div className="absolute inset-0 bg-red-100 bg-opacity-30 flex items-center justify-center z-40 rounded-lg">
      <div className="bg-white bg-opacity-90 rounded-lg p-6 max-w-sm mx-4 shadow-xl border-2 border-red-200">
        <div className="text-center">
          <div className="text-4xl mb-4">⚖️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">{MESSAGES.INVALID_WORD}</h3>
          <p className="text-red-700 mb-4">{gameError}</p>
        </div>
      </div>
    </div>
  );
};

export const ThinkingPopup: React.FC<ThinkingPopupProps> = ({ loading, lastUserWord }) => {
  if (!loading || !lastUserWord) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-100 bg-opacity-90 rounded-lg px-4 py-2 shadow-lg border-2 border-blue-200 z-30">
      <div className="text-center">
        <div className="text-blue-800 font-semibold">{MESSAGES.AI_THINKING_POPUP}</div>
        <div className="text-blue-600 text-sm mt-1">
          마지막 단어: &ldquo;{lastUserWord}&rdquo; ({lastUserWord.charAt(lastUserWord.length - 1)})
        </div>
      </div>
    </div>
  );
};

export const GameEndPopup: React.FC<GameEndPopupProps> = ({ gameEnded, winner, onReset }) => {
  if (!gameEnded || !winner) return null;

  return (
    <div className="absolute inset-0 bg-green-100 bg-opacity-30 flex items-center justify-center z-50 rounded-lg">
      <div className="bg-white bg-opacity-95 rounded-lg p-8 max-w-lg mx-4 shadow-2xl border-2 border-green-200">
        <div className="text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">{MESSAGES.GAME_OVER}</h2>
          <p className="text-green-700 text-lg mb-6">
            {winner === "user" ? MESSAGES.USER_WIN : MESSAGES.AI_WIN}
          </p>
          <button
            onClick={onReset}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {MESSAGES.NEW_GAME}
          </button>
        </div>
      </div>
    </div>
  );
};

export const HintPopup: React.FC<HintPopupProps> = ({ showHintPopup, hintWords, onClose }) => {
  if (!showHintPopup) return null;

  return (
    <div className="absolute inset-0 bg-blue-100 bg-opacity-30 flex items-center justify-center z-40 rounded-lg">
      <div className="bg-white bg-opacity-95 rounded-lg p-6 max-w-md mx-4 shadow-2xl border-2 border-blue-200 max-h-[80vh] overflow-y-auto">
        <div className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold text-blue-800 mb-4">힌트 단어들</h3>
          {hintWords.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
              {hintWords.slice(0, 12).map((word, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-center font-medium text-blue-700">
                  {word}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-blue-700 mb-6">힌트 단어를 찾을 수 없습니다.</p>
          )}
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};