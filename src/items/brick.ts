import * as PIXI from "pixi.js";

// Brick class
export class Brick {
  private graphics: PIXI.Graphics;

  constructor(private app: PIXI.Application, x: number, y: number) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x00ff00);
    this.graphics.drawRect(0, 0, 80, 20); // Set the size of the brick
    this.graphics.endFill();
    this.graphics.x = x;
    this.graphics.y = y;

    app.stage.addChild(this.graphics);
  }

  // Get the bounds of the brick to check collision
  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }

  // Remove the brick from the stage
  public destroy(): void {
    this.app.stage.removeChild(this.graphics);
  }
}
