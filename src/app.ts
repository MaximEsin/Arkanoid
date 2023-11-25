import { GameLogic } from "./logic/gameLogic";
import { InterfaceManager } from "./logic/interfaceManager";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("startGameBtn");
  if (startGameBtn) {
    const interfaceManager = new InterfaceManager();
    let playerName: string | null = null;

    // Subscribe to the start game event
    interfaceManager.onStartGame((name: string) => {
      playerName = name;
      if (name.trim() !== "") {
        // Create a new instance of the game with the player's name
        const game = new GameLogic(name);
        game.initializeGame();

        // Remove the name input container
        const nameContainer = document.querySelector(".container");
        nameContainer?.classList.add("hidden");
      } else {
        alert("Please enter your name before starting the game.");
      }
    });

    // Subscribe to the continue event
    interfaceManager.onContinue(() => {
      if (playerName !== null) {
        // Reset the game
        const game = new GameLogic(playerName);
        game.reset();

        // Start a new game with the same player name
        game.initializeGame();
      }
    });

    startGameBtn.addEventListener("click", () => {
      const playerNameInput = document.getElementById(
        "playerName"
      ) as HTMLInputElement;
      const playerName = playerNameInput.value;

      // Trigger the start game event
      interfaceManager.startGame(playerName);
    });
  }
});
