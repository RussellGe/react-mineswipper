import { useRef } from "react";
import type { Block, Entities, Game, GameControll } from "../types";
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];
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
    this.state.entities[y][x] = entity;
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
            mine: false,
            flagged: false,
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
  randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  randomInt(min: number, max: number) {
    return Math.round(this.randomRange(min, max));
  }
  generateMines(xNum: number, yNum: number) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1);
      const y = this.randomInt(0, this.height - 1);
      const block = this.state.board[y][x];
      if (Math.abs(xNum - block.x) <= 1 && Math.abs(yNum - block.y) <= 1)
        return false;
      if (block.mine) return false;
      block.mine = true;
      return true;
    };
    Array.from({ length: this.mines }, () => null).forEach(() => {
      let placed = false;
      while (!placed) placed = placeRandom();
    });
    this.updateNumbers();
    console.log(this.state.board);
  }
  updateNumbers() {
    this.state.board.forEach((raw) => {
      raw.forEach((block) => {
        if (block.mine) return;
        this.getSiblings(block).forEach((b) => {
          if (b.mine) block.adjacentMines += 1;
        });
      });
    });
  }
  getSiblings(block: Block) {
    return directions
      .map(([dx, dy]) => {
        const x2 = block.x + dx;
        const y2 = block.y + dy;
        if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height)
          return undefined;
        return this.state.board[y2][x2];
      })
      .filter(Boolean) as Block[];
  }
  expandZero(x: number, y: number) {
    if (this.state.board[y][x].adjacentMines) return;

    this.getSiblings(this.state.board[y][x]).forEach((s) => {
      if (!s.revealed) {
        if (!s.flagged) s.revealed = true;
        this.state.entities[s.y][s.x].onChange();
        this.expandZero(s.x, s.y);
      }
    });
  }
  click(x: number, y: number) {
    if (!this.state.mineGenerated) {
      console.log("click gener");
      this.generateMines(x, y);
      this.state.mineGenerated = true;
    }
    this.state.board[y][x].revealed = true;
    this.state.entities[y][x].onChange();
    if (!this.state.board[y][x].adjacentMines) {
      this.expandZero(x, y);
    }
    console.log(this.state);
  }
  getValue(x: number, y: number) {
    return this.state.board[y][x];
  }
  GameControll() {
    return {
      board: this.state.board,
      setEntity: this.setEntity.bind(this),
      click: this.click.bind(this),
      getValue: this.getValue.bind(this),
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
