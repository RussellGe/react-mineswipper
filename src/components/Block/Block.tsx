import React,  { MouseEvent } from "react";
import classNames from "classnames";
import "./Block.scss";
import { Block as BlockType } from "../../types";
import FlagSvg from "../../assets/flag.svg";
interface BlockProps {
  block: BlockType;
  onChange: () => void;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
}

const Block = (props: BlockProps) => {
  const { block, onChange, onContextMenu } = props;

  return (
    <div
      onClick={onChange}
      onContextMenu={onContextMenu}
      className={classNames("block", `num-${block.adjacentMines}`, {
        revealed: block.revealed,
      })}
    >
      {block.flagged ? (
        <img src={FlagSvg} />
      ) : block.revealed && block.adjacentMines ? (
        block.adjacentMines
      ) : (
        ""
      )}
    </div>
  );
};

export default Block;
