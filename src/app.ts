import * as PIXI from "pixi.js";
import { Platform } from "./items/platform";
import { Ball } from "./items/ball";
import { Brick } from "./items/brick";

// Main class that manages the game
export class Game {
  private app: PIXI.Application;
  private platform: Platform;
  private ball: Ball;
  private bricks: Brick[] = [];

  constructor() {
    // Create PIXI app
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
    });

    document.body.appendChild(this.app.view as unknown as Node);

    // Init platform, bricks and ball
    this.platform = new Platform(this.app);
    this.ball = new Ball(this.app);
    this.createBricks();

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
  }

  // Handle ball and platform touch
  private handleTouch(): void {
    if (this.ball.checkPlatformTouch(this.platform)) {
      this.ball.bounce();
    }
  }
}

const game = new Game();
