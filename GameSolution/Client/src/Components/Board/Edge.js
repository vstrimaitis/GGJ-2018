import React, { Component } from 'react';
import PT from 'prop-types';

class Edge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "transparent"
        }
    }
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.state.color,
            // border: "1px solid black"
        };
        
        if(this.props.isActive) {
            return (
                <div
                    onMouseOver={() => this.setState({color: this.props.color})}
                    onMouseOut={() => this.setState({color: "transparent"})}
                    onMouseUp={() => this.setState({color: "transparent"})}
                    onClick={() => this.props.onClick(this.props.start, this.props.end)}
                    className="positionable-item cell-edge"
                    style={st}
                />
            );
        } else {
            return (
                <div
                    className="positionable-item cell-edge"
                    style={st}
                />
            );
        }
        
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
    onClick: PT.func.isRequired,
    isActive: PT.bool.isRequired
}

export default Edge;
