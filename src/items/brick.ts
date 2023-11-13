import * as PIXI from "pixi.js";

// Brick class
export class Brick {
  private graphics: PIXI.Graphics;
  private pointValue: number = 0;

  constructor(private app: PIXI.Application, x: number, y: number) {
    this.graphics = new PIXI.Graphics();
    this.setRandomColor();
    this.graphics.drawRect(0, 0, 80, 20); // Set the size of the brick
    this.graphics.endFill();
    this.graphics.x = x;
    this.graphics.y = y;

    app.stage.addChild(this.graphics);
  }

  // Set random color for the brick
  private setRandomColor(): void {
    const colors = [0xff0000, 0x0000ff, 0x00ff00]; // Red, Blue, Green
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    this.graphics.beginFill(randomColor);

    // Set point value based on color
    switch (randomIndex) {
      case 0: // Red
        this.pointValue = 2;
        break;
      case 1: // Blue
        this.pointValue = 1;
        break;
      case 2: // Green
        this.pointValue = 3;
        break;
    }
  }

  // Get the bounds of the brick to check collision
  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }

  // Remove the brick from the stage
  public destroy(): void {
    this.app.stage.removeChild(this.graphics);
  }

  // Get the point value of the brick
  public getPointValue(): number {
    return this.pointValue;
  }
}
