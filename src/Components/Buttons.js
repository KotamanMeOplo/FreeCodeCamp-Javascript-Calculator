import React, { Component } from 'react';
import SingleButton from './SingleButton';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      buttonList: ['C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']
    };
  }

  clickHandler(symbol){
    this.props.handleClick(symbol);
  }

  render() {
    let buttonArray = [];

    for(let i = 0; i < this.state.buttonList.length; i++){
      buttonArray.push(<SingleButton handleClick={this.clickHandler}  key={i} symbol={this.state.buttonList[i]} />);

      if(i % 4 === 0)
        buttonArray.push(<br key={i+.5} />);
    }

    let buttonsStyle = {
      textAlign: 'right',
      width: '24rem',
      margin: '0 auto'
    };

    return (
      <div id="buttons" style={buttonsStyle}>
        {buttonArray}
      </div>
    );
  }
}

export default Buttons;
