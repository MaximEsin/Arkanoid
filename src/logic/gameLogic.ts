import * as PIXI from "pixi.js";
import { Platform } from "../items/platform";
import { Ball } from "../items/ball";
import { Brick } from "../items/brick";
import { GameInterface } from "../interfaces/game";
import { InterfaceManager } from "./interfaceManager";

// Game logic
export class GameLogic implements GameInterface {
  private app!: PIXI.Application;
  private platform!: Platform;
  private ball!: Ball;
  private bricks: Brick[] = [];
  private score: number = 0;
  private playerName: string;
  private interfaceManager: InterfaceManager;

  constructor(playerName: string, interfaceManager: InterfaceManager) {
    this.playerName = playerName;
    this.interfaceManager = interfaceManager;
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
    this.interfaceManager.showOverlay(isWinner, this.playerName, this.score);
    this.app.ticker.stop();
  }

  // Start a new game with a new player name
  public startNewGame(): void {
    const newName = window.prompt("Enter your new name:");
    if (newName !== null) {
      this.playerName = newName;
      this.reset();
      this.app.ticker.start();
    }
  }

  public setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }
}
