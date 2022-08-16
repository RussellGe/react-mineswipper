import React from 'react';
import styles from './row.less'
import Block from '../Block/Block'
interface RowProps {
    row: number
}
const Row: React.FC<RowProps> =  (props) => {
    const { row } = props
  return (
    <div className={styles.row}>
      {Array.from({length: row}).map(() => {
        return <Block />
      })}
    </div>
  );
}

export default Row;