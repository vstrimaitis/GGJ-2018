import React from 'react';
import dotnetify from 'dotnetify';
import Board from '../Board/Board';

dotnetify.hubServerUrl = "http://localhost:44264";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.vm = dotnetify.react.connect("GameVM", this);
		this.state = {
			GameState: { Message: "", NextPlayerId: -1 },
			PlayerState: { Name: "", Id: "" } 
		};
	}

	handleChange = (e) => {
		this.vm.$dispatch({ PlayerMove: { Message: e.target.value } });
	}

    render() {
		let itIsYourTurn = this.state.GameState.NextPlayerId === this.state.PlayerState.Id;
        return (
			<div className="App-intro">
				<p>Hello, {this.state.PlayerState.Id}</p>
				<p>{itIsYourTurn ? "It is your turn!" : "Wait for your turn..."} {this.state.GameState.NextPlayerId}</p>
				<p>Broadcasted state: {this.state.GameState.Message}</p>

				<input type="text"
					value={this.props.value}
					onChange={this.handleChange} disabled={!itIsYourTurn}>
				</input>

				{false ? <Board width={500} height={600} rows={12} cols={10} /> : ""}
            </div>
        );
    }
}
export default Game;