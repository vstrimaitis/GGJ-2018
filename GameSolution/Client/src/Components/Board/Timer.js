import React, { Component } from 'react';
import PT from 'prop-types';

class Timer extends Component {
    render() {
        return (
            <div className="timer">{this.props.time}</div>
        );
    }
}

Timer.propTypes = {
    time: PT.number.isRequired
};

export default Timer;