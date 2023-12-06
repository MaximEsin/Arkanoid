import * as PIXI from "pixi.js";

// Platform class
export class Platform {
  private graphics: PIXI.Graphics;

  constructor(private app: PIXI.Application) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x800080);
    this.graphics.drawRect(0, 0, 100, 20);
    this.graphics.endFill();
    this.graphics.x = app.screen.width / 2 - this.graphics.width / 2;
    this.graphics.y = app.screen.height - 40;

    app.stage.addChild(this.graphics);

    // Add event listener
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  public moveLeft(): void {
    if (this.graphics.x > 0) {
      this.graphics.x -= 50;
    }
  }

  public moveRight(): void {
    if (this.graphics.x < this.app.screen.width - this.graphics.width) {
      this.graphics.x += 50;
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft": {
        this.moveLeft();
        break;
      }
      case "ArrowRight": {
        this.moveRight();
        break;
      }
    }
  }

  // Reset platform to initial position
  public reset(): void {
    this.graphics.x = this.app.screen.width / 2 - this.graphics.width / 2;
    this.graphics.y = this.app.screen.height - 40;
  }

  // Get the bounds of the platform to check touch
  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }
}
