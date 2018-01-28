import React, { Component } from 'react';
import './App.css';
import Looser from '../EndScreen/Looser';
import Winner from '../EndScreen/Winner';

class End extends Component {
  constructor(props){
     super(props);
  }
  handleRetryClick(props) {
    this.props.setState({
      screen : "game"
    })
  }
  render() {
    return (
      <div className="App">
        {(this.state.screen === "looser") ? <Looser onRetryClicked={handleRetryClick.bind(this)}/> : <Winner onRetryClicked={handleRetryClick.bind(this)}/>}
      </div>
    );
  }
}

export default End;
