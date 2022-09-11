import React from "react";
import "./row.scss";
import Block from "../Block/BlockProxy";
import type { Block as BlockType } from "../../types/index";
import type { GameStore } from "../../hooks/useGame";
interface RowProps {
  row: BlockType[];
  y: number;
}
const Row: React.FC<RowProps> = (props) => {
  const { row, y} = props;
  return (
    <div className="row">
      {row.map((item, index) => {
        return <Block key={index} y={y} x={index} block={item}/>;
      })}
    </div>
  );
};

export default Row;
