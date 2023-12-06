export interface GameInterface {
  initializeGame(): void;
  reset(): void;
  showOverlay(isWinner: boolean): void;
  setPlayerName(playerName: string): void;
  startNewGame(): void;
}
