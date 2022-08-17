import React from 'react';
import './row.scss'
import Block from '../Block/Block'
import type {Block as BlockType} from '../../types/index'
interface RowProps {
    row: BlockType[]
}
const Row: React.FC<RowProps> =  (props) => {
    const { row } = props
  return (
    <div className='row'>
      {row.map((item, index) => {
        return <Block key={index} block={item}/>
      })}
    </div>
  );
}

export default Row;