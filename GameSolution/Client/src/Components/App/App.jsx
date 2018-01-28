import React, { Component } from 'react';
import './App.css';
import Game from '../Game/Game';
import Start from '../StartScreen/Start';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {screen: "main"};
  }
  handleStartClick() {
    this.setState({
      screen : "game"
    })
  }
  render() {
    return (
      <div className="App">
        {(this.state.screen === "main") ? <Start onStartClicked={this.handleStartClick.bind(this)} /> : <Game />}
      </div>
    );
  }
}

export default App;
