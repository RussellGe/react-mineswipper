import React from 'react';
import './App.css';
import Block from './components/Block/Block';
interface State {
  row: number
}
function App() {
  const state: State = {
    row: 5
  }

  return (
    <div className="App">
      { Array.from({length: state.row}).map(() => {
        return <Block />
      }) }
      
    </div>
  );
}

export default App;
