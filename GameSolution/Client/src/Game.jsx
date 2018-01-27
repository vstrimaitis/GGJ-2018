import React from 'react';
import dotnetify from 'dotnetify';

dotnetify.hubServerUrl = "http://localhost:44264";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.vm = dotnetify.react.connect("GameVM", this);
		this.state = {
			GameState: { Message: "" },
			PlayerState: { Name: "", Id: "" } 
		};
	}

	handleChange = (e) => {
		this.vm.$dispatch({ GameState: { Message: e.target.value } });
	}

    render() {
        return (
			<div className="App-intro">
				<p>Hehiojpollo, {this.state.PlayerState.Id}</p>
				<p>Broadcasted state: {this.state.GameState.Message}</p>

				<input type="text"
					value={this.props.value}
					onChange={this.handleChange}>
				</input>
            </div>
        );
    }
}
export default Game;