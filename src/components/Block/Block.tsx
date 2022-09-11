import React from "react";
import classNames from "classnames";
import "./Block.scss";
import { Block as BlockType } from "../../types";

interface BlockProps {
  block: BlockType;
  onChange: () => void;
}

const Block = (props: BlockProps) => {
  const { block, onChange } = props;

  return (
    <div
      onClick={onChange}
      className={classNames("block", `num-${block.adjacentMines}`, {
        revealed: block.revealed,
      })}
    >
      {block.revealed && block.adjacentMines ? block.adjacentMines : ""}
    </div>
  );
};

export default Block;
