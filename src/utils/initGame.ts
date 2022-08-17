
import type { Game, Block } from "../types"


class GamePlay {
    public state: Game | undefined
    constructor(public width: number, public height: number, public mines: number) {
        this.reset()
    }
    reset(width = this.width, height = this.height, mines = this.mines) {
        this.width = width
        this.height = height
        this.mines = mines

        this.state = {
            mineGenerated: false,
            status: 'ready',
            board: Array.from({ length: this.height }, (_, y) =>
              Array.from({ length: this.width },
                (_, x): Block => ({
                  x,
                  y,
                  adjacentMines: 0,
                  revealed: false,
                }),
              ),
            ),
          }
    }
    get board () {
        return this.state?.board || []
    }
    click (block: Block) {
        block.revealed = true
        return block
    }
}
export const GameState = new GamePlay(5, 5, 3)