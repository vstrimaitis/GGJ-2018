import React, { Component } from 'react';
import PT from 'prop-types';
import Cell from "./Cell"
import Positionable from "./Positionable"

class Board extends Component {
    constructor(props) {
        super(props);
        const cells = [];
        this.cellW = props.width / props.cols;
        this.cellH = props.height / props.rows;
        for(let i = 0; i < props.rows; i++) {
            for(let j = 0; j < props.cols; j++) {
                cells.push({
                    x: j*this.cellW,
                    y: i*this.cellH
                });
            }
        }
        this.state = {cells};
    }

    buildCell(coords) {
        return (
            <Positionable x={coords.x} y={coords.y}>
                <Cell width={this.cellW} height={this.cellH} color="rgba(255, 255, 255, 0.8)" />
            </Positionable>
        )
    }
    render() {
        console.log(this.state);
        return (
            <div className="positionable-container" id="board" style={{width: this.props.width, height: this.props.height}}>
                {this.state.cells.map(this.buildCell.bind(this))}
            </div>
        )
    }
}

Board.propTypes = {
    width: PT.number,
    height: PT.number,
    rows: PT.number,
    cols: PT.number
}

export default Board;
