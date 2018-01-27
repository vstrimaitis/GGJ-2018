import React, { Component } from 'react';
import PT from 'prop-types';
import Cell from "./Cell";
import Corner from "./Corner";
import Edge from "./Edge";
import Positionable from "./Positionable"

const initialCornerColor = "rgb(255, 255, 255)";
const initialEdgeColor = "rgba(255,255,255,0)";//"rgb(255, 214, 150)";
const initialCellColor = "rgb(255, 255, 255)";

class Board extends Component {
    constructor(props) {
        super(props);
        const cells = [];
        this.cellW = props.width / props.cols;
        this.cellH = props.height / props.rows;
        this.cornerSize = 10;
        this.edgeWeight = 7;
        this.edgeLengthRatio = 0.9;
        for(let i = 0; i < props.rows; i++) {
            for(let j = 0; j < props.cols; j++) {
                cells.push({
                    coords: {
                        x: j,
                        y: i
                    },
                    pixelCoords: {
                        x: j*this.cellW,
                        y: i*this.cellH,
                    },
                    color: initialCellColor
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
                    coords: {
                        start: {
                            x: j,
                            y: i
                        },
                        end: {
                            x: j+1,
                            y: i
                        }
                    },
                    pixelCoords: {
                        x: x1+delta,
                        y: y,
                    },
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
                    coords: {
                        start: {
                            x: j,
                            y: i
                        },
                        end: {
                            x: j,
                            y: i+1
                        }
                    },
                    pixelCoords: {
                        x: x,
                        y: y1+delta,
                    },
                    w: this.edgeWeight,
                    h: dy-2*delta,
                    color: initialEdgeColor,
                });
            }
        }
        // edges[0].color = "red";
        // edges[1].color = "red";
        // edges[132].color = "red";
        // corners[0].color = "red";
        // corners[1].color = "red";
        // corners[2].color = "red";
        // corners[13].color = "red";
        

        this.state = {cells, corners, edges};
    }

    buildCell(info) {
        return (
            <Positionable key={info.coords.x+"_"+info.coords.y} x={info.pixelCoords.x} y={info.pixelCoords.y}>
                <Cell width={this.cellW} height={this.cellH} color={info.color} />
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
            <Positionable
                key={info.coords.start.x+"_"+info.coords.start.y+"_"+info.coords.end.x+"_"+info.coords.end.y}
                x={info.pixelCoords.x}
                y={info.pixelCoords.y}>
                <Edge
                    height={info.h}
                    width={info.w}
                    color={info.color}
                    selectedColor={this.props.playerColor}
                    start={info.coords.start}
                    end={info.coords.end}
                    onClick={this.handleEdgeClick.bind(this)}
                />
            </Positionable>
        )
    }

    handleEdgeClick(start, end) {
        const edges = this.state.edges.slice();
        const changedEdge = edges.filter(x => x.coords.start === start && x.coords.end === end)[0];
        if(changedEdge.color !== initialEdgeColor) {
            return;
        }
        console.log(start, end);
        changedEdge.color = this.props.playerColor;
        const cells = this.state.cells.map(x => this.updateCell(x, edges));
        this.setState({...this.state, edges, cells});
    }

    updateCell(cell, edges) {
        const boundingEdges = edges.filter(e => this.isEdgeBounding(e, cell));
        const allSame = !!boundingEdges.reduce((a, b) => a.color === b.color ? a : {}).color;
        if (!allSame) return cell;
        if (boundingEdges[0].color === initialEdgeColor) return cell;
        return {...cell, color: this.props.playerColor};
    }

    isEdgeBounding(edge, cell) {
        const x = cell.coords.x;
        const y = cell.coords.y;
        const x1 = edge.coords.start.x;
        const y1 = edge.coords.start.y;
        const x2 = edge.coords.end.x;
        const y2 = edge.coords.end.y;
        return  (x1 === x   && y1 === y   && x2 === x+1 && y2 === y)   ||
                (x1 === x   && y1 === y   && x2 === x   && y2 === y+1) ||
                (x1 === x+1 && y1 === y   && x2 === x+1 && y2 === y+1) ||
                (x1 === x   && y1 === y+1 && x2 === x+1 && y2 === y+1);
    }

    render() {
        return (
            <div className="positionable-container" id="board" style={{width: this.props.width, height: this.props.height}}>
                {this.state.cells.map(this.buildCell.bind(this))}
                {/* {this.state.corners.map(this.buildCorner.bind(this))} */}
                {this.state.edges.map(this.buildEdge.bind(this))}
            </div>
        )
    }
}

Board.propTypes = {
    width: PT.number.isRequired,
    height: PT.number.isRequired,
    rows: PT.number.isRequired,
    cols: PT.number.isRequired,
    playerColor: PT.string.isRequired
}

export default Board;
