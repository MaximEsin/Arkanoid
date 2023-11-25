// InterfaceManager.ts
export class InterfaceManager {
  private startGameCallback: (playerName: string) => void;
  private continueCallback: () => void;

  constructor() {
    this.startGameCallback = () => {};
    this.continueCallback = () => {};
  }

  // Method to subscribe to the start game event
  public onStartGame(callback: (playerName: string) => void): void {
    this.startGameCallback = callback;
  }

  // Method to subscribe to the continue event
  public onContinue(callback: () => void): void {
    this.continueCallback = callback;
  }

  // Method to trigger the start game event
  public startGame(playerName: string): void {
    this.startGameCallback(playerName);
  }

  // Method to trigger the continue event
  public continue(): void {
    this.continueCallback();
  }
}
