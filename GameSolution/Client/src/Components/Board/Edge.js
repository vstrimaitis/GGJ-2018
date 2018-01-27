import React, { Component } from 'react';
import PT from 'prop-types';

class Edge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        }
    }
    render() {
        const st = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.state.color,
            border: "1px solid black"
        };
        
        if(this.props.activeColor !== this.props.color) { // active
            return (
                <div
                    onMouseOver={() => this.setState({color: this.props.activeColor})}
                    onMouseOut={() => this.setState({color: this.props.color})}
                    onClick={() => this.props.onClick(this.props.start, this.props.end)}
                    className="positionable-item cell-edge"
                    style={st}
                />
            );
        } else { // inactive
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
    activeColor: PT.string.isRequired
}

export default Edge;
