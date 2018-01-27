import React from 'react';
import dotnetify from 'dotnetify';
import Board from '../Board/Board';
import {mapGameState} from "../../utils/GameStateMapper";
import {getBoardDimensions} from "../../utils/Logic";

dotnetify.hubServerUrl = "http://localhost:44264";

const data = {};

function makeInitialData() {
    const rows = 12;
    const cols = 10;
    const players = [{id: 1234, score: 0, color: "red"}, {id: 3412, score: 0, color: "yellow"}];
    const cells = [];
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            cells.push({
                coords: { x: j, y: i },
                influences: []
            });
        }
    }
    cells[0].influences[0] = {amount: 100, playerId: 1234};
    cells[0].influences[1] = {amount: 50, playerId: 3412};
    const edges = [];
    // Horizontal edges
    for(let i = 0; i < rows+1; i++) {
        for(let j = 0; j < cols; j++) {
            edges.push({
                start: { x: j, y: i },
                end: { x: j+1, y: i },
                owner: null
            });
        }
    }
    // Vertical edges
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols+1; j++) {
            edges.push({
                start: { x: j, y: i },
                end: { x: j, y: i+1 },
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
    data.playerId = 1234;
}
class Game extends React.Component {
    constructor(props) {
        super(props);
        makeInitialData();
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
                        playerId= {1234}
                    /> : ""}
            </div>
        );
    }
}
export default Game;