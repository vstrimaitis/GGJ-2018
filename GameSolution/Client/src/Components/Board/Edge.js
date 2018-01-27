import React, { Component } from 'react';
import PT from 'prop-types';

class Edge extends Component {
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color,
            border: "1px solid black"
        };
        return (
            <div
                onClick={() => this.props.onClick(this.props.start, this.props.end)}
                className="positionable-item cell-edge"
                style={st}
            />
        );
    }
}

Edge.propTypes = {
    color: PT.string.isRequired,
    height: PT.number.isRequired,
    width: PT.number.isRequired,
    start: PT.shape({
        x: PT.number.isRequired,
        y: PT.number.isRequired
    }).isRequired,
    end: PT.shape({
        x: PT.number.isRequired,
        y: PT.number.isRequired
    }).isRequired,
    onClick: PT.func.isRequired
}

export default Edge;
