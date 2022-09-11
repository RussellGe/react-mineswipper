import { useRef } from "react";
import type { Block, Entities, Game, GameControll } from "../types";

export class GameStore {
  state: Game = {
    board: [],
    mineGenerated: false,
    status: "ready",
    entities: [],
  };
  constructor(
    public width: number,
    public height: number,
    public mines: number
  ) {
    this.reset();
  }

  setEntity(x: number, y: number, entity: Entities) {
    this.state.entities[x][y] = entity;
  }
  reset(width = this.width, height = this.height, mines = this.mines) {
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.state = {
      mineGenerated: false,
      status: "ready",
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from(
          { length: this.width },
          (_, x): Block => ({
            x,
            y,
            adjacentMines: 0,
            revealed: false,
          })
        )
      ),
      entities: Array.from({ length: this.height }, (_, y) =>
        Array.from(
          { length: this.width },
          (_, x): Entities => ({
            props: {},
            onChange: () => {},
          })
        )
      ),
    };
  }
  click(x: number, y: number) {
    this.state.board[x][y].revealed = true;
    this.state.entities[x][y].onChange();
    console.log(this.state);
  }
  getValue(x: number, y: number) {
    return this.state.board[x][y]
  }
  GameControll() {
    return {
      board: this.state.board,
      setEntity: this.setEntity.bind(this),
      click: this.click.bind(this),
      getValue: this.getValue.bind(this)
    };
  }
}

export default function useGame(width: number, height: number, mines: number) {
  const gameState = useRef<GameControll>();
  if (!gameState.current) {
    const GameControll = new GameStore(width, height, mines).GameControll();
    gameState.current = GameControll;
  }
  return [gameState.current];
}
