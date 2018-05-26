import React, { Component } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 3rem;
  width: 5rem;
  font-size: 2rem;
  margin: .5rem;
  border-radius: 5px;
  box-shadow: inset -3px -3px 1px rgba(0, 0, 0, .5), 3px 3px 1px rgba(0, 0, 0, .8);
  border: none;
  outline: none;
  transform: translate(0, 0);

  &:active {
    box-shadow: inset -3px -3px 1px rgba(0, 0, 0, .5), 1px 1px 1px rgba(0, 0, 0, .8);
    transform: translate(2px, 2px);
  }
`;

class SingleButton extends Component {
  constructor(props) {
    super(props);
    this.clikcHandler = this.clikcHandler.bind(this);
  }

  clikcHandler() {
    this.props.handleClick(this.props.symbol);
  }

  render() {
    return (
      <StyledButton onClick={this.clikcHandler}>{this.props.symbol}</StyledButton>
    );
  }
}

export default SingleButton;
