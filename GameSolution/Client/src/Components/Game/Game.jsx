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
			TimeLeft: 60, 
			CurrentPlayerTimeLeft: 15 
		};

		window.addEventListener("beforeunload", (ev) => { 
			ev.preventDefault(); 
			this.vm.$dispatch({ PlayerExited: true });
		});
	}

	componentWillUnmount = () => { 
		this.vm.$destroy();
	}

	handleChange = (e) => {
		this.vm.$dispatch({ PlayerMove: { Message: e.target.value, StartCoordinate: {X: 0, Y: 0}, EndCoordinate: {X: 1, Y: 0}} });
    }
    
    handleMove = edgeCoords => {
        console.log("SENDING", edgeCoords);
        this.vm.$dispatch({
            PlayerMove: {
                StartCoordinate: {
                    X: edgeCoords.start.x,
                    Y: edgeCoords.start.y
                },
                EndCoordinate: {
                    X: edgeCoords.end.x,
                    Y: edgeCoords.end.y
                }
            }
        });
    }

    render() {
        const gs = mapGameState(this.state.GameState);
        console.log("Current state", gs);
        let itIsYourTurn = this.state.GameState.NextPlayerId === this.state.PlayerState.Id;
        const myPlayer = this.state.GameState.Players.filter(x => x.Id === this.state.PlayerState.Id)[0];
        const myScore = myPlayer ? myPlayer.Score : 0;
        return (
			<div className="App-intro">
				<p>Player {this.state.PlayerState.Id} has {this.state.CurrentPlayerTimeLeft}s left</p>
				<p>The game has {this.state.TimeLeft}s left</p>
				<p>Hello, {this.state.PlayerState.Id}</p>
				<p>{itIsYourTurn ? "It is your turn!" : "Wait for your turn..."} {this.state.GameState.NextPlayerId}</p>
				<p>Broadcasted state: {this.state.GameState.Message}</p>

				<input type="text"
					value={this.props.value}
					onChange={this.handleChange} disabled={!itIsYourTurn}>
				</input>
                <span>Your score: {myScore}</span>

				{true ?
                    <Board
                        width={500}
                        height={600}
                        gridSize={getBoardDimensions(gs.cells)}
                        data={gs}
                        playerId= {this.state.PlayerState.Id}
                        onEdgeSelect={this.handleMove.bind(this)}
                        isActive={itIsYourTurn}
                    /> : ""}
            </div>
        );
    }
}
export default Game;