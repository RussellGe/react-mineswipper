import React from 'react';
import './App.css';
import Row from './components/Row/Row';
import { GameState } from './utils/initGame';

function App() {
  const game = GameState

  return (
    <div className="App">
      { game.board.map((item, index) => {
        return <Row key={index} row={item} />
      }) }
      
    </div>
  );
}

export default App;
