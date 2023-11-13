import { Game } from "../app";

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("startGameBtn");
  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      const playerNameInput = document.getElementById(
        "playerName"
      ) as HTMLInputElement;
      const playerName = playerNameInput.value;

      if (playerName.trim() !== "") {
        // Create a new instance of the game with the player's name
        const game = new Game(playerName);

        // Remove the name input container
        const nameContainer = document.querySelector(".container");
        nameContainer?.classList.add("hidden");
      } else {
        alert("Please enter your name before starting the game.");
      }
    });
  }
});
