import React, { Component } from 'react';
import Looser from '../EndScreen/Looser';
import Winner from '../EndScreen/Winner';

class End extends Component {
  constructor(props){
     super(props);
     this.state = {
         screen: "winner"
     }
     this.decideIfWinner();
  }

  decideIfWinner() {
      var players = this.props.players;
      var maxScore = players.map(x => x.score).reduce((a, b) => a >= b ? a : b, 0);
      if(maxScore === this.props.score) 
          this.setState({
              screen : "winner"
          });
      else 
        this.setState({
            screen : "looser"
        });
  }
  render() {
    return (
      <div className="App">
        {(this.state.screen === "looser") ? <Looser onRetryClicked={this.props.onRetryClicked.bind(this)}/> : <Winner onRetryClicked={this.props.onRetryClicked.bind(this)}/>}
      </div>
    );
  }
}

export default End;
