import React, { Component } from 'react';
import PT from 'prop-types';

class Corner extends Component {
    constructor(props) {
        super(props);
        this.state = {opacity: 1};
    }
    render() {
        const st = {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: this.props.color,
            opacity: this.state.opacity,
            border: "1px solid black"
        }
        return (
            <div
                className="positionable-item cell-corner"
                style={st}
                onMouseOver={() => this.setState({opacity: 0.1})}
                onMouseOut={() => this.setState({opacity: 1})}
            />
        );
    }
}

Corner.propTypes = {
    color: PT.string.isRequired,
    size: PT.number.isRequired
}

export default Corner;
