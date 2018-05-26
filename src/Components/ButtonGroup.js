import React, { Component } from 'react';
import styled from 'styled-components';
import SingleButton from './SingleButton';


const ButtonWrapper = styled.div`
  text-align: right;
  width: 24rem;
  margin: 0 auto;
`;

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(symbol){
    this.props.handleClick(symbol);
  }

  render() {
    let buttonLis = ['C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];
    let buttonArray = [];

    for(let i = 0; i < buttonList.length; i++){
      buttonArray.push(<SingleButton handleClick={this.clickHandler}  key={i} symbol={buttonList[i]} />);

      if(i % 4 === 0)
        buttonArray.push(<br key={i+.5} />);
    }

    return (
      <ButtonWrapper>
        {buttonArray}
      </ButtonWrapper>
    );
  }
}

export default ButtonGroup;
