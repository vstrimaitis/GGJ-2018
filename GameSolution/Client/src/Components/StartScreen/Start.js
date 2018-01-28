import React, { Component } from 'react';
import { getMainImage, getButton } from '../../assets/TextureLoader';


class Start extends Component {
    render() {
        return(
        <div>
            <img src={getMainImage()} style={{
                position: "relative",
                top: 0,
                left: 0,
                height: "95vh"
                }}/>
            <div>
                <button style={{position: "absolute",
                            top: "70vh", 
                            height:"10vh",
                            left: "46vw",
                            background: "url("+getButton()+")",
                            backgroundSize: "cover",
                            width: "10vw",
                            cursor: "pointer",
                            border: "none"
                        }}
                        onClick={this.props.onStartClicked}>
                </button>
            </div>
        </div>
        );
    }
}
export default Start;
