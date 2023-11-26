// Game controller
import { GameLogic } from "./gameLogic";
import { InterfaceManager } from "./interfaceManager";

export class GameController {
  private gameLogic: GameLogic;
  private interfaceManager: InterfaceManager;

  constructor() {
    this.gameLogic = new GameLogic("");
    this.interfaceManager = new InterfaceManager();

    // Subscribe to events from InterfaceManager
    this.interfaceManager.onStartGame((name: string) => {
      this.startGame(name);
    });

    this.interfaceManager.onContinue(() => {
      this.continueGame();
    });
  }

  public startGame(playerName: string): void {
    // Pass the player name to the game logic
    this.gameLogic.setPlayerName(playerName);

    // Initialize the game
    this.gameLogic.initializeGame();

    // Hide the name input container
    const nameContainer = document.querySelector(".container");
    nameContainer?.classList.add("hidden");
  }

  public continueGame(): void {
    // Reset the game and start a new game with the same player name
    this.gameLogic.reset();
    this.gameLogic.initializeGame();
  }
}
