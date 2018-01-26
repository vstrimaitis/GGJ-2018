import React, { Component } from 'react';
import PT from 'prop-types';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state={
            opacity: 1
        }
    }
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color,
            opacity: this.state.opacity
        }
        return (
            <div
                onMouseOver={() => this.setState({opacity: 0.8})}
                onMouseOut={() => this.setState({opacity: 1})}
                className="positionable-item cell-body"
                style={st}
            />
        );
    }
}

Cell.propTypes = {
    color: PT.string.isRequired,
    height: PT.number.isRequired,
    width: PT.number.isRequired
}

export default Cell;
