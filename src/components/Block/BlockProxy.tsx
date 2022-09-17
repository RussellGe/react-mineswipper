import React, { useLayoutEffect, MouseEvent } from "react";
import classNames from "classnames";
import "./Block.scss";
import { Block as BlockType } from "../../types";
import BoardContext from "./BoardContext";
import { GameStore } from "../../hooks/useGame";
import Block from "./Block";
interface BlockProps {
  block: BlockType;
  y: number;
  x: number;
}

const BlockProxy = (props: BlockProps) => {
  const { x, y } = props;
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const { setEntity, click, getValue, flag } = React.useContext(BoardContext)!;
  useLayoutEffect(() => {
    setEntity(x, y, { props, onChange: () => forceUpdate() });
  }, []);
  console.log(1);
  const handleClick = () => {
    click(x, y);
    setTimeout(() => {
      console.log(getValue(x, y));
    });
  };
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    flag(x, y);
  };
  return (
    <Block
      block={getValue(x, y)}
      onChange={handleClick}
      onContextMenu={handleContextMenu}
    />
  );
};

export default BlockProxy;
