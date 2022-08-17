export interface Game {
    board: Block[][],
    mineGenerated: boolean,
    status: 'ready'
}


export interface Block {
    x: number,
    y: number,
    revealed: boolean;
    adjacentMines: number;
}