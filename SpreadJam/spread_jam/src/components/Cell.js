import React, { Component } from 'react';
import PT from 'prop-types';

class Cell extends Component {
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color,
            border: "1px solid black"
        }
        return (
            <div className="positionable-item" style={st} />
        );
    }
}

Cell.propTypes = {
    corners: PT.arrayOf(PT.string),
    edges: PT.arrayOf(PT.string),
    color: PT.string,
    height: PT.number,
    width: PT.number
}

export default Cell;
