import React, { Component } from 'react';
import styled from 'styled-components';

const StyledScreen = styled.div`
  height: 4rem;
  width: 21rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 4rem;
  text-align: right;
  background-color: #573;
  box-shadow: 3px 3px 3px #444, 5px 5px 5px rgba(255, 255, 255, .5), inset 5px 5px 10px rgba(0, 0, 0, .5), inset 7px 7px 3px rgba(0, 0, 0, .5), -3px -3px 3px rgba(0, 0, 0, .5),-5px -5px 10px rgba(0, 0, 0, .5);
  border-radius: 5px;
`;

class Screen extends Component {
  render() {
    return (
      <StyledScreen>
        {this.props.mathOperation}
      </StyledScreen>
    );
  }
}

export default Screen;
