import * as PIXI from "pixi.js";
import { Platform } from "./items/platform";
import { Ball } from "./items/ball";
import { Brick } from "./items/brick";
import { GameInterface } from "./interfaces/game";

// Main class that manages the game
export class Game implements GameInterface {
  private app: PIXI.Application;
  private platform: Platform;
  private ball: Ball;
  private bricks: Brick[] = [];
  private score: number = 0;
  private playerName: string;

  constructor(playerName: string) {
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
    this.playerName = playerName;

    // Add update function to PIXI ticker
    this.app.ticker.add(this.update.bind(this));
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

    this.app.ticker.stop();

    // Continue button click event
    const continueBtn = document.getElementById(
      "continueBtn"
    ) as HTMLButtonElement;
    continueBtn.addEventListener("click", () => {
      this.app.ticker.start();
      overlay.classList.add("hidden");
      overlay.classList.remove("overlay");
      this.reset();
      this.startNewGame();
    });
  }

  // Start a new game with a new player name
  private startNewGame(): void {
    const nameContainer = document.getElementById(
      "nameContainer"
    ) as HTMLElement;
    nameContainer.classList.remove("hidden");
    this.playerName = "";
  }
}
