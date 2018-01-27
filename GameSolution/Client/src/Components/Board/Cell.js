import React, { Component } from 'react';
import PT from 'prop-types';

class Cell extends Component {
    render() {
        let st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color
        };
        return (
            <div
                onClick={() => console.log(this.props.influence)}
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
    influence: PT.shape({
        amount: PT.number.isRequired,
        color: PT.string.isRequired
    })
}

export default Cell;
