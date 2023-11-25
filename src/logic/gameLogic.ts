import * as PIXI from "pixi.js";
import { Platform } from "../items/platform";
import { Ball } from "../items/ball";
import { Brick } from "../items/brick";
import { GameInterface } from "../interfaces/game";

// Game logic
export class GameLogic implements GameInterface {
  private app!: PIXI.Application;
  private platform!: Platform;
  private ball!: Ball;
  private bricks: Brick[] = [];
  private score: number = 0;
  private playerName: string;

  constructor(playerName: string) {
    this.playerName = playerName;
  }

  public initializeGame(): void {
    // Create PIXI app
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
    });

    document.body.appendChild(this.app.view as unknown as Node);

    // Init platform, bricks and ball
    this.platform = new Platform(this.app);
    this.ball = new Ball(this.app, this);
    this.createBricks();

    // Add update function to PIXI ticker
    this.app.ticker.add(() => this.update());

    const playerName = this.playerName;
    const startNewGame = () => this.startNewGame();

    const continueBtn = document.getElementById(
      "continueBtn"
    ) as HTMLButtonElement;

    let continueBtnClicked = false;

    const continueBtnClickHandler = () => {
      if (!continueBtnClicked) {
        continueBtnClicked = true;
        this.reset();

        continueBtn.removeEventListener("click", continueBtnClickHandler); // Remove the event listener
      }
    };
    continueBtn.addEventListener("click", continueBtnClickHandler);
  }

  // Create bricks
  private createBricks(): void {
    const brickRows = 5;
    const brickCols = 8;
    const brickWidth = 80;
    const brickHeight = 20;

    for (let r = 0; r < brickRows; r++) {
      for (let c = 0; c < brickCols; c++) {
        const brickX = c * (brickWidth + 15) + 20; // 15 is the gap between bricks
        const brickY = r * (brickHeight + 15) + 50;

        const brick = new Brick(this.app, brickX, brickY);
        this.bricks.push(brick);
      }
    }
  }

  private handleBrickTouch(): void {
    for (const brick of this.bricks) {
      if (this.ball.checkBrickTouch(brick)) {
        this.ball.bounce();
        this.score += brick.getPointValue();
        brick.destroy();
        this.bricks = this.bricks.filter((b) => b !== brick);
      }
    }
  }

  // Game update function called on each frame
  private update(): void {
    this.ball.move();
    this.handleTouch();
    this.handleBrickTouch();

    // Check if all bricks are destroyed, indicating the player has won
    if (this.bricks.length === 0) {
      this.showOverlay(true);
    }
  }

  // Handle ball and platform touch
  private handleTouch(): void {
    if (this.ball.checkPlatformTouch(this.platform)) {
      this.ball.bounce();
    }
  }

  // Reset the entire game
  public reset(): void {
    this.platform.reset();
    this.ball.reset();
    this.resetBricks();
    this.score = 0;

    // Hide the overlay
    const overlay = document.getElementById("overlay") as HTMLElement;
    overlay.classList.add("hidden");
    overlay.classList.remove("overlay");
  }

  // Reset bricks to initial position
  private resetBricks(): void {
    this.bricks.forEach((brick) => brick.destroy());
    this.bricks = [];
    this.createBricks();
  }

  // Show overlay with player's name and score
  public showOverlay(isWinner: boolean): void {
    const overlay = document.getElementById("overlay") as HTMLElement;
    const overlayName = document.getElementById("overlayName") as HTMLElement;
    const overlayScore = document.getElementById("overlayScore") as HTMLElement;
    const overlayMessage = document.getElementById(
      "overlayMessage"
    ) as HTMLElement;

    overlayName.textContent = `Player: ${this.playerName}`;
    overlayScore.textContent = `Score: ${this.score}`;
    overlayMessage.textContent = isWinner
      ? "Congratulations! You won!"
      : "Game over! You lost.";

    overlay.classList.remove("hidden");
    overlay.classList.add("overlay");
    this.updateLeaderboard();

    this.app.ticker.stop();

    // Continue button click event
    const continueBtn = document.getElementById(
      "continueBtn"
    ) as HTMLButtonElement;

    const continueBtnClickHandler = () => {
      overlay.classList.add("hidden");
      overlay.classList.remove("overlay");
      this.reset();
      this.startNewGame();
      continueBtn.removeEventListener("click", continueBtnClickHandler);
    };
    continueBtn.addEventListener("click", continueBtnClickHandler);
  }

  // Start a new game with a new player name
  private startNewGame(): void {
    const newName = window.prompt("Enter your new name:");
    if (newName !== null) {
      this.playerName = newName;
      this.reset();
      this.app.ticker.start();
    }
  }

  // Store players' score
  private updateLeaderboard(): void {
    const scores: Record<string, number> = JSON.parse(
      localStorage.getItem("leaderboard") || "{}"
    );
    scores[this.playerName] = this.score;
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
