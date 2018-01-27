import React, { Component } from 'react';
import PT from 'prop-types';

class Cell extends Component {
    render() {
        let st = {
            width: this.props.width,
            height: this.props.height
        };
        if(this.props.influences.length > 1) {
            const sum = this.props.influences.map(x => x.amount).reduce((a,b)=>a+b);
            const normalized = this.props.influences.map(x => ({
                color: x.color,
                percentage: x.amount/sum*100
            })).map(x => x.color + " " + x.percentage + "%");
            st.background = "linear-gradient(" +normalized.join(", ")+ ")";
        } else if(this.props.influences.length === 1) {
            st.backgroundColor = this.props.influences[0].color;    
        }else {
            st.backgroundColor = this.props.color
        }
        return (
            <div
                onClick={() => console.log(this.props.influences)}
                className="positionable-item cell-body"
                style={st}
            />
        );
    }
}

Cell.propTypes = {
    color: PT.string.isRequired,
    height: PT.number.isRequired,
    width: PT.number.isRequired,
    influences: PT.arrayOf(PT.shape({
        amount: PT.number.isRequired,
        color: PT.string.isRequired
    })).isRequired
}

export default Cell;
