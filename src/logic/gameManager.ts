// GameManager.ts
import { GameInterface } from "../interfaces/game";
import { ManagerInterface } from "../interfaces/manager";

export class GameManager {
  private gameLogic: GameInterface;
  private interfaceManager: ManagerInterface;

  constructor(gameLogic: GameInterface, interfaceManager: ManagerInterface) {
    this.gameLogic = gameLogic;
    this.interfaceManager = interfaceManager;

    // Subscribe to events from InterfaceManager
    this.interfaceManager.onStartGame((name: string) => {
      this.startGame(name);
    });

    this.interfaceManager.onContinue(() => {
      this.continueGame();
    });
  }

  public startGame(playerName: string): void {
    this.gameLogic.setPlayerName(playerName);
    this.gameLogic.initializeGame();

    // Hide the name input container
    const nameContainer = document.querySelector(".container");
    nameContainer?.classList.add("hidden");
  }

  public continueGame(): void {
    this.gameLogic.startNewGame();
  }
}
