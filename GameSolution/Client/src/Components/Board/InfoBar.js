import React, { Component } from 'react';
import PT from 'prop-types';
import Timer from "./Timer";
import Avatar from "./Avatar";

class InfoBar extends Component {
    mapPlayer(player) {
        /*const text = "." + player.id + ".";
        let result = text;
        if(player.isPlayer) result = <u>{result}</u>
        if(player.isCurrent) result = <b>{result}</b>
        return result;*/
        return (
            <Avatar
                key={player.id}
                color={player.color}
                score={player.score}
                size={player.isCurrent ? "large" : "small"}
                text={player.isPlayer ? "YOU" : undefined}
            />
        );
    }
    render() {
        return (
            <div className="info-bar">
                <Timer time={this.props.timeLeft.player} />
                {this.props.players.map(this.mapPlayer.bind(this))}
                <div className="stretcher" />
                <Timer time={this.props.timeLeft.game} />
            </div>
        );
    }
}

InfoBar.propTypes = {
    timeLeft: PT.shape({
        player: PT.number.isRequired,
        game: PT.number.isRequired
    }).isRequired,
    players: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        color: PT.string.isRequired,
        score: PT.number.isRequired,
        isCurrent: PT.bool,
        isPlayer: PT.bool
    })).isRequired
};

export default InfoBar;