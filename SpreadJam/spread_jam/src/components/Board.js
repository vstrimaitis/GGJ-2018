import React, { Component } from 'react';
import PT from 'prop-types';
import Cell from "./Cell";
import Corner from "./Corner";
import Edge from "./Edge";
import Positionable from "./Positionable"

const initialCornerColor = "rgb(255, 255, 255)";
const initialEdgeColor = "rgb(255, 214, 150)";

class Board extends Component {
    constructor(props) {
        super(props);
        const cells = [];
        this.cellW = props.width / props.cols;
        this.cellH = props.height / props.rows;
        this.cornerSize = 10;
        this.edgeWeight = 4;
        this.edgeLengthRatio = 0.9;
        for(let i = 0; i < props.rows; i++) {
            for(let j = 0; j < props.cols; j++) {
                cells.push({
                    x: j*this.cellW,
                    y: i*this.cellH
                });
            }
        }
        const corners = [];
        for(let i = 0; i < props.rows+1; i++) {
            for(let j = 0; j < props.cols+1; j++) {
                corners.push({
                    x: j*this.cellW-this.cornerSize/2,
                    y: i*this.cellH-this.cornerSize/2,
                    color: initialCornerColor
                });
            }
        }

        const edges = [];
        // Horizontal edges
        for(let i = 0; i < props.rows+1; i++) {
            for(let j = 0; j < props.cols; j++) {
                const x1 = j*this.cellW+this.cornerSize/2;
                const y = i*this.cellH-this.cornerSize/2 + (this.cornerSize-this.edgeWeight)/2;
                const x2 = (j+1)*this.cellW - this.cornerSize/2;
                const dx = x2-x1;
                const delta = (1-this.edgeLengthRatio)*dx/2;
                edges.push({
                    x: x1+delta,
                    y: y,
                    w: dx-2*delta,
                    h: this.edgeWeight,
                    color: initialEdgeColor
                });
            }
        }
        // Vertical edges
        for(let i = 0; i < props.rows; i++) {
            for(let j = 0; j < props.cols+1; j++) {
                const x = j*this.cellW-this.cornerSize/2+ (this.cornerSize-this.edgeWeight)/2;
                const y1 = i*this.cellH+this.cornerSize/2;
                const y2 = (i+1)*this.cellH-this.cornerSize/2;
                const dy = y2-y1;
                const delta = (1-this.edgeLengthRatio)*dy/2;
                edges.push({
                    x: x,
                    y: y1+delta,
                    w: this.edgeWeight,
                    h: dy-2*delta,
                    color: initialEdgeColor
                });
            }
        }
        edges[0].color = "red";
        edges[1].color = "red";
        edges[132].color = "red";
        corners[0].color = "red";
        corners[1].color = "red";
        corners[2].color = "red";
        corners[13].color = "red";
        

        this.state = {cells, corners, edges};
    }

    buildCell(coords) {
        return (
            <Positionable key={coords.x+"_"+coords.y} x={coords.x} y={coords.y}>
                <Cell width={this.cellW} height={this.cellH} color="rgb(255, 255, 255)" />
            </Positionable>
        )
    }

    buildCorner(coords) {
        return (
            <Positionable key={coords.x+"_"+coords.y} x={coords.x} y={coords.y}>
                <Corner size={this.cornerSize} color={coords.color} />
            </Positionable>
        )
    }

    buildEdge(info) {
        return (
            <Positionable key={info.x+"_"+info.y} x={info.x} y={info.y}>
                <Edge height={info.h} width={info.w} color={info.color} />
            </Positionable>
        )
    }
    render() {
        console.log(this.state);
        return (
            <div className="positionable-container" id="board" style={{width: this.props.width, height: this.props.height}}>
                {this.state.cells.map(this.buildCell.bind(this))}
                {this.state.corners.map(this.buildCorner.bind(this))}
                {this.state.edges.map(this.buildEdge.bind(this))}
            </div>
        )
    }
}

Board.propTypes = {
    width: PT.number.isRequired,
    height: PT.number.isRequired,
    rows: PT.number.isRequired,
    cols: PT.number.isRequired
}

export default Board;
