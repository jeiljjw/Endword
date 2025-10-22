export interface Word {
  id: number;
  text: string;
  player: "user" | "ai";
}

export interface GameState {
  words: Word[];
  wordId: number;
  loading: boolean;
  inputValue: string;
  gameError: string | null;
  showErrorPopup: boolean;
  lastUserWord: string;
  gameStarted: boolean;
  gameEnded: boolean;
  winner: string | null;
  showHintPopup: boolean;
  hintWords: string[];
}

export interface GameActions {
  handleSend: (text: string) => void;
  resetConversation: () => void;
  setInputValue: (value: string) => void;
}

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

export interface ChatWindowProps {
  words: Word[];
  onSend: (text: string) => void;
  loading: boolean;
  resetConversation: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}