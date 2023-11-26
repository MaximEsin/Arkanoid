export interface GameInterface {
  initializeGame(): void;
  reset(): void;
  showOverlay(isWinner: boolean): void;
}
