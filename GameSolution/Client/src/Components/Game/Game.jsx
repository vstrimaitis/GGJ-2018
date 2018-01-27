import React from 'react';
import dotnetify from 'dotnetify';
import Board from '../Board/Board';

dotnetify.hubServerUrl = "http://localhost:44264";

const data = {};

function makeInitialData() {
    const rows = 12;
    const cols = 10;
    const players = [{id: 1234, score: 0, color: "red"}];
    const cells = [];
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            cells.push({
                coords: {
                    x: j,
                    y: i
                },
                influences: []
            });
        }
    }
    const edges = [];
    // Horizontal edges
    for(let i = 0; i < rows+1; i++) {
        for(let j = 0; j < cols; j++) {
            edges.push({
                start: {
                    x: j,
                    y: i
                },
                end: {
                    x: j+1,
                    y: i
                },
                owner: null
            });
        }
    }
    // Vertical edges
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols+1; j++) {
            edges.push({
                start: {
                    x: j,
                    y: i
                },
                end: {
                    x: j,
                    y: i+1
                },
                owner: null
            });
        }
    }
    data.players = players;
    data.cells = cells;
    data.edges = edges;
    data.board = {
        rows: cells.map(c => c.coords.y).reduce((a, b) => Math.max(a, b)) + 1,
        cols: cells.map(c => c.coords.x).reduce((a, b) => Math.max(a, b)) + 1
    };
}
class Game extends React.Component {
    constructor(props) {
        super(props);
        makeInitialData();
        console.log(data);
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

				{true ?
                    <Board
                        width={500}
                        height={600}
                        rows={data.board.rows}
                        cols={data.board.cols}
                        playerColor="red"
                    /> : ""}
            </div>
        );
    }
}
export default Game;