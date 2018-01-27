import React from 'react';
import dotnetify from 'dotnetify';
import Board from '../Board/Board';
import {mapGameState} from "../../utils/GameStateMapper";
import {getBoardDimensions} from "../../utils/Logic";

dotnetify.hubServerUrl = "http://localhost:44264";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.vm = dotnetify.react.connect("GameVM", this);
		this.state = {
			GameState: { Message: "", NextPlayerId: -1, 
				PlayerMove: { Message: "", StartCoordinate: {X: 0, Y: 0}, EndCoordinate: {X: 0, Y: 0}},
                Edges: [],
                Cells: [],
                Players: []
			},
			PlayerState: { Name: "", Id: "" }, 
            TimeLeft: 60
		};

		window.addEventListener("beforeunload", (ev) => { 
			this.vm.$dispatch({ PlayerExited: true });
		});
	}

	handleChange = (e) => {
        console.log(this.state.GameState.Edges);
		this.vm.$dispatch({ PlayerMove: { Message: e.target.value, StartCoordinate: {X: 0, Y: 0}, EndCoordinate: {X: 1, Y: 0}} });
	}

    render() {
        const gs = mapGameState(this.state.GameState);
        console.log(gs);
        let itIsYourTurn = this.state.GameState.NextPlayerId === this.state.PlayerState.Id;
        return (
			<div className="App-intro">
				<p>{this.state.TimeLeft}s left</p>
				<p>Hello, {this.state.PlayerState.Id}</p>
				<p>{itIsYourTurn ? "It is your turn!" : "Wait for your turn..."} {this.state.GameState.NextPlayerId}</p>
				<p>Broadcasted state: {this.state.GameState.Message}</p>

				<input type="text"
					value={this.props.value}
					onChange={this.handleChange} disabled={!itIsYourTurn}>
				</input>

				{true ?
                    <Board
                        width={500}
                        height={600}
                        gridSize={getBoardDimensions(gs.cells)}
                        data={gs}
                        playerId= {this.state.PlayerState.Id}
                    /> : ""}
            </div>
        );
    }
}
export default Game;