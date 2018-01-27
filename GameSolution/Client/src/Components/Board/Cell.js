import React, { Component } from 'react';
import PT from 'prop-types';

class Cell extends Component {
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color
        }
        return (
            <div
                onClick={() => console.log(this.props.influences)}
                className="positionable-item cell-body"
                style={st}
            />
        );
    }
}

Cell.propTypes = {
    color: PT.string.isRequired,
    height: PT.number.isRequired,
    width: PT.number.isRequired,
    influences: PT.arrayOf(PT.shape({
        amount: PT.number.isRequired,
        playerId: PT.number.isRequired
    })).isRequired
}

export default Cell;
