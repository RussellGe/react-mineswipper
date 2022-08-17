import React, { useState } from 'react';
import classNames from 'classnames'
import './Block.scss'
import { Block as BlockType } from '../../types';
import { GameState } from '../../utils/initGame'
interface BlockProps {
  block: BlockType
}


const Block = (props: BlockProps) => {
  const { block } = props 
  const [showBlock, setShowBlock] = useState(block)
  const handleClick = () => {
    const newBlock = GameState.click(block)
    console.log(newBlock)
    setShowBlock(newBlock)
  }

  return (
    <div onClick={handleClick} className={classNames('block', {'revealed': showBlock.revealed})}>
      {showBlock.revealed && showBlock.adjacentMines ? showBlock.adjacentMines : ''}
    </div>
  );
}

export default Block;