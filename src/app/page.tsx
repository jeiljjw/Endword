'use client';

import React from "react";
import TitleHeader from "../components/TitleHeader";
import ChatWindow from "../components/ChatWindow";
import { ErrorPopup, ThinkingPopup, GameEndPopup, HintPopup } from "../components/GamePopups";
import { useGameLogic } from "../hooks/useGameLogic";


export default function HomePage() {
  const { gameState, setInputValue, handleSend, resetConversation, handleShowHint, closeHintPopup } = useGameLogic();


  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start">
      <div className="w-full flex flex-col items-center mt-12 mb-8">
      <TitleHeader />
      </div>
      <ChatWindow
        words={gameState.words}
        onSend={handleSend}
        loading={gameState.loading}
        resetConversation={resetConversation}
        inputValue={gameState.inputValue}
        onInputChange={setInputValue}
        showHintPopup={gameState.showHintPopup}
        hintWords={gameState.hintWords}
        onShowHint={handleShowHint}
        onCloseHint={closeHintPopup}
      />

      <ThinkingPopup
        loading={gameState.loading}
        lastUserWord={gameState.lastUserWord}
      />

      <ErrorPopup
        showErrorPopup={gameState.showErrorPopup}
        gameError={gameState.gameError}
      />

      <GameEndPopup
        gameEnded={gameState.gameEnded}
        winner={gameState.winner}
        onReset={resetConversation}
      />

      <HintPopup
        showHintPopup={gameState.showHintPopup}
        hintWords={gameState.hintWords}
        onClose={closeHintPopup}
      />
    </main>
  );
}