import React, { Component } from 'react';
import PT from 'prop-types';
import {getCrown} from "../../assets/TextureLoader";

class Avatar extends Component {
    render() {
        const c = "avatar avatar-" + this.props.size
        return (
            <div className={c}>
                {this.props.text ? <span className="avatar-text">{this.props.text}</span> : ""}
                <div><img src={getCrown(this.props.color)} /></div>
                <span className="avatar-score">{this.props.score}</span>
            </div>
        );
    }
}

Avatar.propTypes = {
    color: PT.string.isRequired,
    score: PT.number.isRequired,
    text: PT.string,
    size: PT.oneOf("small", "large").isRequired
};

export default Avatar;