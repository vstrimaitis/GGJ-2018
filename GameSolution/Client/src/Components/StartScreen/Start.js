import React, { Component } from 'react';
import Main from "../../imgs/main.png";


class Start extends Component {
    constructor(props) {
        super(props);
        props.screen = "main";
    }
    render() {
        return(
        <div>
            <Main />
        </div>
        );
    }
}
export default Start;
