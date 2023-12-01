import * as PIXI from "pixi.js";
import { ManagerInterface } from "../interfaces/manager";
import { GameLogic } from "./gameLogic";

// InterfaceManager.ts
export class InterfaceManager implements ManagerInterface {
  private startGameCallback: (playerName: string) => void;
  private continueCallback: () => void;
  private gameLogic: GameLogic;

  constructor(gameLogic: GameLogic) {
    this.startGameCallback = () => {};
    this.continueCallback = () => {};
    this.gameLogic = gameLogic;
  }

  // Method to init
  public init(): void {
    const continueBtn = document.getElementById(
      "continueBtn"
    ) as HTMLButtonElement;

    let continueBtnClicked = false;

    const continueBtnClickHandler = () => {
      if (!continueBtnClicked) {
        continueBtnClicked = true;
        this.gameLogic.reset();
        continueBtn.removeEventListener("click", continueBtnClickHandler); // Remove the event listener
      }
    };
    continueBtn.addEventListener("click", continueBtnClickHandler);
  }

  // Method to subscribe to the start game event
  public onStartGame(callback: (playerName: string) => void): void {
    this.startGameCallback = callback;
  }

  // Method to subscribe to the continue event
  public onContinue(callback: () => void): void {
    this.continueCallback = callback;
  }

  // Method to trigger the start game event
  public startGame(playerName: string): void {
    this.startGameCallback(playerName);
  }

  // Method to trigger the continue event
  public continue(): void {
    this.continueCallback();
  }
}
