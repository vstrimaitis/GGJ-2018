import React, { Component } from 'react';
import PT from 'prop-types';

class Edge extends Component {
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color
        }
        return (
            <div
                className="positionable-item cell-edge"
                style={st}
            />
        );
    }
}

Edge.propTypes = {
    color: PT.string.isRequired,
    height: PT.number.isRequired,
    width: PT.number.isRequired
}

export default Edge;
