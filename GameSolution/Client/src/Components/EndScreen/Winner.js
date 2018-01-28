import React, { Component } from 'react';
import { getWinnerImage, getRetryButton } from '../../assets/TextureLoader';


class Looser extends Component {
    render() {
        return(
        <div>
            <img src={getWinnerImage()} style={{
                position: "relative",
                top: 0,
                left: 0,
                height: "95vh"
                }}/>
            <div>
                <button style={{position: "absolute",
                            top: "78vh", 
                            height:"10vh",
                            left: "46vw",
                            background: "none",
                            cursor: "pointer",
                            border: "none",
                            padding: 0
                        }}
                        >
                        <img src={getRetryButton()} style={{
                            maxHeight: "100%"
                        }}/>
                </button>
            </div>
        </div>
        );
    }
}
export default Looser;
