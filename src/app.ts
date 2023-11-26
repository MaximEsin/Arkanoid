import { GameController } from "./logic/gameController";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("startGameBtn");
  if (startGameBtn) {
    const gameController = new GameController();

    startGameBtn.addEventListener("click", () => {
      const playerNameInput = document.getElementById(
        "playerName"
      ) as HTMLInputElement;
      const playerName = playerNameInput.value;

      // Trigger the start game event through GameController
      gameController.startGame(playerName);
    });
  }
});
