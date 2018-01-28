import React, { Component } from 'react';
import './App.css';
import Game from '../Game/Game';
import Start from '../StartScreen/Start';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {screen: "main"};
  }
  render() {
    return (
      <div className="App">
        {(this.state.screen === "main") ? <Start /> : <Game />}
      </div>
    );
  }
}

export default App;
