import React from 'react';

import classes from './ColorButton.module.css';

class ColorButton extends React.Component {

    state = {
        color: 'red',
        colorInText: 'blue'
    }

    changeColor = () => {
        this.setState( prevState => {
            if (prevState.color === 'blue') {
                return {
                    color: 'red',
                    colorInText: 'blue'
                }
            } else {
                return {
                    color: 'blue',
                    colorInText: 'red'
                }
            }
        });
    }

    render() {
        return (
            <div className={classes.container}>
                <button
                    onClick={this.changeColor}
                    style={{ backgroundColor: this.state.color}}
                    className={classes.colorButton} >
                {`Change to ${this.state.colorInText}`}
                </button>
            </div>
        )
    }
}

export default ColorButton;