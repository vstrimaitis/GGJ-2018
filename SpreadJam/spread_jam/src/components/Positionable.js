import React, { Component } from 'react';
import PT from 'prop-types';

class Positionable extends Component {
    render() {
        return (
            <div className="positionable-item" style={{
                top: this.props.y,
                left: this.props.x
            }}>
                {this.props.children}
            </div>
        );
    }
}

Positionable.propTypes = {
    x: PT.number,
    y: PT.number
}

export default Positionable;
