import React, { Component } from 'react';
import PT from 'prop-types';
import { getCell } from '../../assets/TextureLoader.js';
class Cell extends Component {
    render() {
        const i = this.props.influence;
        const image = i ? getCell(i.color, i.amount) : getCell();
        let st = {
            width: this.props.width,
            height: this.props.height,
            background: "url("+image+")",
            backgroundSize: "cover"
        };
        return (
            <div
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
