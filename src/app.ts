import { GameLogic } from "./logic/gameLogic";
import { GameManager } from "./logic/gameManager";
import { InterfaceManager } from "./logic/interfaceManager";

document.addEventListener("DOMContentLoaded", () => {
  console.log(GameLogic);
  const startGameBtn = document.getElementById("startGameBtn");
  if (startGameBtn) {
    const gameLogic = new GameLogic("");
    const interfaceManager = new InterfaceManager(gameLogic);
    const gameManager = new GameManager(gameLogic, interfaceManager);

    startGameBtn.addEventListener("click", () => {
      const playerNameInput = document.getElementById(
        "playerName"
      ) as HTMLInputElement;
      const playerName = playerNameInput.value;

      // Trigger the start game event through GameManager
      gameManager.startGame(playerName);
    });
  }
});
