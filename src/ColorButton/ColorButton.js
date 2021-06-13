import React from 'react';

import classes from './ColorButton.module.css';

class ColorButton extends React.Component {

    state = {
        color: 'red',
        colorInText: 'blue',
        isChecked: false
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

    handleCheckboxChanged = e => {
        this.setState( {
            isChecked: e.target.checked
        });
    }

    render() {
        return (
            <div className={classes.container}>
                <button
                    onClick={this.changeColor}
                    style={{ backgroundColor: this.state.color}}
                    className={classes.colorButton}
                    disabled={this.state.isChecked}
                >
                {`Change to ${this.state.colorInText}`}
                </button>
                <input
                    defaultChecked={this.state.isChecked}
                    id="disable-button-checkbox"
                    type="checkbox"
                    onChange={this.handleCheckboxChanged}
                    aria-checked={this.state.isChecked}
                />
                <label htmlFor="disable-button-checkbox">Disable button</label>
            </div>
        )
    }
}

export default ColorButton;