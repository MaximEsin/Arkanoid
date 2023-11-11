import * as PIXI from "pixi.js";
import { Platform } from "./items/platform";
import { Ball } from "./items/ball";

// Main class that manages the game
export class Game {
  private app: PIXI.Application;
  private platform: Platform;
  private ball: Ball;

  constructor() {
    // Create PIXI app
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
    });

    document.body.appendChild(this.app.view as unknown as Node);

    // Init platform and ball
    this.platform = new Platform(this.app);
    this.ball = new Ball(this.app);

    // Add update function to PIXI ticker
    this.app.ticker.add(this.update.bind(this));
  }
  // Game update function called on each frame
  private update(): void {
    this.ball.move();
    this.handleTouch();
  }
  // Handle ball and platform touch
  private handleTouch(): void {
    if (this.ball.checkTouch(this.platform)) {
      this.ball.bounce();
    }
  }
}

const game = new Game();
