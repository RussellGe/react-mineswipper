import React from "react";
import "./App.css";
import BoardContext from "./components/Block/BoardContext";
import Row from "./components/Row/Row";
import useGame from "./hooks/useGame";

function App() {
  const [game] = useGame(10, 10, 8)!;
  return (
    <div className="App">
      <BoardContext.Provider value={game}>
        {game.board.map((item, index) => {
          return <Row key={index} y={index} row={item}/>;
        })}
      </BoardContext.Provider>
    </div>
  );
}

export default App;
