export interface Game {
  
  
    board: Block[][];
  mineGenerated: boolean;
  status: "ready" | 'start' | 'success' | 'fail';
  entities: Entities[][];
}

export interface Entities {
    props: Record<string, any>
    onChange: () => void
}
export interface Block {
  x: number;
  y: number;
  revealed: boolean;
  adjacentMines: number;
  mine: boolean;
  flagged: boolean
}
export interface GameControll {
    board: Block[][];
    setEntity: (x: number, y: number, entity: Entities) => void;
    click: (x: number, y: number) => void;
    getValue: (x: number, y: number) => Block;
}