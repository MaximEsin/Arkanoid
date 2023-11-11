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
  }

  public moveLeft(): void {
    if (this.graphics.x > 0) {
      this.graphics.x -= 10;
    }
  }

  public moveRight(): void {
    if (this.graphics.x < this.app.screen.width - this.graphics.width) {
      this.graphics.x += 10;
    }
  }
  // Get the bounds of the platform to check touch
  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }
}
