import React, { Component } from 'react';
import PT from 'prop-types';
import Cell from "./Cell";
import Edge from "./Edge";
import Positionable from "./Positionable"

const initialEdgeColor = "rgba(255,255,255,0.1)";//"rgb(255, 214, 150)";
const initialCellColor = "rgb(255, 255, 255)";

class Board extends Component {
    constructor(props) {
        super(props);
        this.cellW = props.width / props.data.board.cols;
        this.cellH = props.height / props.data.board.rows;
        this.cornerSize = 10;
        this.edgeWeight = 7;
        this.edgeLengthRatio = 0.9;
        
        const cells = props.data.cells.map(this.mapCell.bind(this));
        const edges = props.data.edges.map(this.mapEdge.bind(this));
        const player = props.data.players.filter(x => x.id === props.data.playerId)[0];
        this.state = {cells, edges, player};
    }

    mapCell(cell) {
        const newCell = {...cell};
        newCell.pixelCoords = {
            x: cell.coords.x*this.cellW,
            y: cell.coords.y*this.cellH,
        };
        newCell.color = initialCellColor;
        return newCell;
    }

    mapEdge(edge) {
        const isVertical = edge.start.x === edge.end.x;
        const newEdge = {
            coords: {
                start: edge.start,
                end: edge.end
            },
            color: initialEdgeColor //TODO: remove
        }
        if(isVertical) {
            const x = edge.start.x*this.cellW-this.cornerSize/2+ (this.cornerSize-this.edgeWeight)/2;
            const y1 = edge.start.y*this.cellH+this.cornerSize/2;
            const y2 = edge.end.y*this.cellH-this.cornerSize/2;
            const dy = y2-y1;
            const delta = (1-this.edgeLengthRatio)*dy/2;
            newEdge.pixelCoords = {
                x: x,
                y: y1+delta
            };
            newEdge.w = this.edgeWeight;
            newEdge.h = dy-2*delta;
        } else {
            const x1 = edge.start.x*this.cellW+this.cornerSize/2;
            const y = edge.start.y*this.cellH-this.cornerSize/2 + (this.cornerSize-this.edgeWeight)/2;
            const x2 = edge.end.x*this.cellW - this.cornerSize/2;
            const dx = x2-x1;
            const delta = (1-this.edgeLengthRatio)*dx/2;
            
            newEdge.pixelCoords = {
                x: x1+delta,
                y: y
            };
            newEdge.w = dx-2*delta;
            newEdge.h = this.edgeWeight;
        }

        return newEdge;
    }

    buildPositionable(elem, info) {
        return (
            <Positionable key={info.pixelCoords.x+"_"+info.pixelCoords.y} x={info.pixelCoords.x} y={info.pixelCoords.y}>
                {elem(info)}
            </Positionable>
        );
    }

    cell(info) {
        return (
            <Cell width={this.cellW} height={this.cellH} color={info.color} />
        );
    }
    edge(info) {
        return (<Edge
            height={info.h}
            width={info.w}
            color={info.color}
            start={info.coords.start}
            end={info.coords.end}
            onClick={this.handleEdgeClick.bind(this)}
        />);
    }

    handleEdgeClick(start, end) {
        const edges = this.state.edges.slice();
        const changedEdge = edges.filter(x => x.coords.start === start && x.coords.end === end)[0];
        if(changedEdge.color !== initialEdgeColor) {
            return;
        }
        console.log(start, end);
        changedEdge.color = this.state.player.color;
        const cells = this.state.cells.map(x => this.updateCell(x, edges));
        this.setState({...this.state, edges, cells});
    }

    updateCell(cell, edges) {
        const boundingEdges = edges.filter(e => this.isEdgeBounding(e, cell));
        const allSame = !!boundingEdges.reduce((a, b) => a.color === b.color ? a : {}).color;
        if (!allSame) return cell;
        if (boundingEdges[0].color === initialEdgeColor) return cell;
        return {...cell, color: this.state.player.color};
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
                {this.state.cells.map(x => this.buildPositionable(this.cell.bind(this), x))}
                {this.state.edges.map(x => this.buildPositionable(this.edge.bind(this), x))}
            </div>
        )
    }
}

Board.propTypes = {
    width: PT.number.isRequired,
    height: PT.number.isRequired,
    data: PT.shape({
        playerId: PT.number.isRequired,
        players: PT.arrayOf(PT.shape({
            id: PT.number.isRequired,
            score: PT.number.isRequired,
            color: PT.string.isRequired
        })).isRequired,
        board: PT.shape({
            rows: PT.number.isRequired,
            cols: PT.number.isRequired
        }).isRequired,
        cells: PT.arrayOf(PT.shape({
            coords: PT.shape({
                x: PT.number.isRequired,
                y: PT.number.isRequired
            }).isRequired,
            influences: PT.arrayOf(PT.shape({
                // ???
            })).isRequired
        })).isRequired,
        edges: PT.arrayOf(PT.shape({
            start: PT.shape({
                x: PT.number.isRequired,
                y: PT.number.isRequired
            }).isRequired,
            end: PT.shape({
                x: PT.number.isRequired,
                y: PT.number.isRequired
            }).isRequired,
            owner: PT.number
        })).isRequired
    }).isRequired
}

export default Board;
