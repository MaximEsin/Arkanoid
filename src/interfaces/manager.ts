export interface ManagerInterface {
  onStartGame(callback: (playerName: string) => void): void;
  onContinue(callback: () => void): void;
  startGame(playerName: string): void;
  continue(): void;
}
