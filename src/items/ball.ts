import * as PIXI from "pixi.js";
import { Platform } from "./platform";
import { Brick } from "./brick";
import { GameInterface } from "../interfaces/game";

// Ball class
export class Ball {
  private graphics: PIXI.Graphics;
  private speedX: number = 5;
  private speedY: number = -5;
  private game: GameInterface;

  constructor(private app: PIXI.Application, game: GameInterface) {
    this.game = game;
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x800080);
    this.graphics.drawCircle(0, 0, 15);
    this.graphics.endFill();
    this.graphics.x = app.screen.width / 2;
    this.graphics.y = app.screen.height - 60;

    app.stage.addChild(this.graphics);
  }

  // Move the ball
  public move(): void {
    this.graphics.x += this.speedX;
    this.graphics.y += this.speedY;

    // Bounce x-axis
    if (
      this.graphics.x + this.graphics.width >= this.app.screen.width ||
      this.graphics.x <= 0
    ) {
      this.speedX = -this.speedX;
    }

    // Bounce y-axis
    if (this.graphics.y <= 0) {
      this.speedY = -this.speedY;
    }

    // Reset game if ball reaches floor
    if (this.graphics.y + this.graphics.height >= this.app.screen.height) {
      this.game.reset();
    }
  }

  // Invert Y speed
  public bounce(): void {
    this.speedY = -this.speedY;
  }

  // Check if platform is touched
  public checkPlatformTouch(platform: Platform): boolean {
    const ballBounds = this.graphics.getBounds();
    const platformBounds = platform.getBounds();
    return (
      ballBounds.x + ballBounds.width >= platformBounds.x &&
      ballBounds.x <= platformBounds.x + platformBounds.width &&
      ballBounds.y + ballBounds.height >= platformBounds.y
    );
  }

  // Check brick touch
  public checkBrickTouch(brick: Brick): boolean {
    const ballBounds = this.graphics.getBounds();
    const brickBounds = brick.getBounds();
    return (
      ballBounds.x + ballBounds.width >= brickBounds.x &&
      ballBounds.x <= brickBounds.x + brickBounds.width &&
      ballBounds.y + ballBounds.height >= brickBounds.y &&
      ballBounds.y <= brickBounds.y + brickBounds.height
    );
  }

  // Reset ball
  public reset(): void {
    this.graphics.x = this.app.screen.width / 2;
    this.graphics.y = this.app.screen.height - 60;
    this.speedX = 5;
    this.speedY = -5;
  }
}
