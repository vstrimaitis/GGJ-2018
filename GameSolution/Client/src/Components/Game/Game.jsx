import React from 'react';
import dotnetify from 'dotnetify';
import Board from '../Board/Board';
import {mapGameState} from "../../utils/GameStateMapper";
import {getBoardDimensions} from "../../utils/Logic";
import Loader from "react-loader";
import InfoBar from "../Board/InfoBar";

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
			PlayerState: { Name: "", Id: -1 }, 
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

    restartGame = () => {
        if(this.state.GameState.GameEnded)
        {
            this.vm.$dispatch({ RestartGame: true }); 
        }
    }

    render() {
        const gs = mapGameState(this.state.GameState);
        console.log("Current mapped state", gs);
        let itIsYourTurn = this.state.GameState.NextPlayerId === this.state.PlayerState.Id;
        const myPlayer = this.state.GameState.Players.filter(x => x.Id === this.state.PlayerState.Id)[0];
        const myScore = myPlayer ? myPlayer.Score : 0;
        return (            
			<div className="App-intro">
                {!this.state.GameState.GameEnded ?                 
                <div>
                {/* <span>Player: {this.state.CurrentPlayerTimeLeft}s / Total: {this.state.TimeLeft}s</span>
				<p>Hello, {this.state.PlayerState.Id}</p>
                <p>{gs.players.map(x => x.id === this.state.GameState.NextPlayerId ? <b>{x.id+","}</b> : x.id+",")}</p>
				<span>Your score: {myScore}</span> */}

                <Loader loaded={this.state.PlayerState.Id > -1}>
                    <InfoBar
                        timeLeft={{
                            player: this.state.CurrentPlayerTimeLeft,
                            game: this.state.TimeLeft
                        }}
                        players={
                            gs.players.map(x => x.id === myPlayer.Id ? {...x, isPlayer: true} : x)
                                        .map(x => x.id === this.state.GameState.NextPlayerId ? {...x, isCurrent: true} : x)
                        }
                    />
                    <Board
                        width={500}
                        height={600}
                        gridSize={getBoardDimensions(gs.cells)}
                        data={gs}
                        playerId= {this.state.PlayerState.Id}
                        onEdgeSelect={this.handleMove.bind(this)}
                        isActive={itIsYourTurn}
                    />
                </Loader>
                </div>
                : 
                <div>Game Ended</div>}
            </div>            
        );
    }
}
export default Game;