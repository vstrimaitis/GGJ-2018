import React, { Component } from 'react';
import Board from "./components/Board";

class App extends Component {
    render() {
        return (
            <div className="Game">
                <Board width={500} height={600} rows={12} cols={10} />
            </div>
        );
    }
}

export default App;
