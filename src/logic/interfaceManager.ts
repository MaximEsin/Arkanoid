import * as PIXI from "pixi.js";
import { ManagerInterface } from "../interfaces/manager";

// InterfaceManager.ts
export class InterfaceManager implements ManagerInterface {
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

  // Method to show the overlay
  public showOverlay(
    isWinner: boolean,
    playerName: string,
    score: number
  ): void {
    const overlay = document.getElementById("overlay") as HTMLElement;
    const overlayName = document.getElementById("overlayName") as HTMLElement;
    const overlayScore = document.getElementById("overlayScore") as HTMLElement;
    const overlayMessage = document.getElementById(
      "overlayMessage"
    ) as HTMLElement;

    overlayName.textContent = `Player: ${playerName}`;
    overlayScore.textContent = `Score: ${score}`;
    overlayMessage.textContent = isWinner
      ? "Congratulations! You won!"
      : "Game over! You lost.";

    overlay.classList.remove("hidden");
    overlay.classList.add("overlay");
    this.updateLeaderboard(playerName, score);
  }

  public handleContinueButtonClick(): void {
    const overlay = document.getElementById("overlay") as HTMLElement;
    overlay.classList.add("hidden");
    overlay.classList.remove("overlay");
    this.continue();
  }

  // Method to update the leaderboard
  private updateLeaderboard(playerName: string, score: number): void {
    const scores: Record<string, number> = JSON.parse(
      localStorage.getItem("leaderboard") || "{}"
    );
    scores[playerName] = score;
    localStorage.setItem("leaderboard", JSON.stringify(scores));

    // Get the top 5 scores
    const topScores = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Display the leaderboard
    const leaderboard = document.getElementById("leaderboard") as HTMLElement;
    leaderboard.innerHTML = "<h3>Leaderboard</h3>";
    topScores.forEach(([name, score], index) => {
      const entry = document.createElement("p");
      entry.textContent = `${index + 1}. ${name}: Score ${score}`;
      leaderboard.appendChild(entry);
    });
  }
}
