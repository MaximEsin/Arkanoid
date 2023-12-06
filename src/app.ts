import { GameLogic } from "./logic/gameLogic";
import { GameManager } from "./logic/gameManager";
import { InterfaceManager } from "./logic/interfaceManager";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("startGameBtn");
  const continueBtn = document.getElementById("continueBtn");
  if (startGameBtn) {
    const interfaceManager = new InterfaceManager();
    const gameLogic = new GameLogic("", interfaceManager);
    const gameManager = new GameManager(gameLogic, interfaceManager);

    startGameBtn.addEventListener("click", () => {
      const playerNameInput = document.getElementById(
        "playerName"
      ) as HTMLInputElement;
      const playerName = playerNameInput.value;

      // Trigger the start game event through GameManager
      gameManager.startGame(playerName);
    });

    continueBtn!.addEventListener("click", () => {
      interfaceManager.handleContinueButtonClick();
    });
  }
});
