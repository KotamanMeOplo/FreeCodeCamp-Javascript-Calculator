import React, { Component } from 'react';
import styled from 'styled-components';
import Screen from './Components/Screen';
import ButtonGroup from './Components/ButtonGroup';

const Wrapper = styled.div`
  background-color: #444;
  width: 24rem;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 25px;
  box-shadow: inset 7px 7px 7px #333, inset 10px 10px 10px rgba(255, 255, 255, .5), inset -5px -5px 5px rgba(0, 0, 0, .5),inset -10px -10px 10px rgba(0, 0, 0, .5), 5px 5px 15px rgba(0, 0, 0, .5), 15px 15px 5px rgba(0, 0, 0, .5);
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonClickHandlder = this.buttonClickHandlder.bind(this);
    this.state = {
      screenText: '0',
      commaUsed: false,
      lastOperator: '',
      firstValue: undefined,
      answerDisplayed: false
    };
    
    this.mathOperations = {
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
      '*': (x, y) => x * y,
      '/': (x, y) => x / y
    };
  }

  checkForErrors(val) {
    return parseFloat(val, 10) > 999999999 || (isNaN(val) && !operators.test(val)) || /e/.test(val) ? 'Error' : val
  };

  round(strNum) {
    let numParts = strNum.split('.');
    let allowedDecimals = 9 - numParts[0].length;

    return (Math.round(parseFloat(strNum, 10) * Math.pow(10, allowedDecimals)) / Math.pow(10, allowedDecimals)).toString();
  }

  processScreenText(symbol) {
    const numbers = new RegExp(/^\d$/);
    const operators = new RegExp(/^\/|\*|-|\+|=$/);
    let tempString = this.state.screenText;

    if(symbol === 'C'){
      tempString = '0';
    
      this.setState({
        commaUsed: false,
        lastOperator: '',
        firstValue: undefined
      });
    }else if(tempString.length < 9 || (this.state.commaUsed && tempString.length < 10)){   //Allow bigger number to be typed
      if(symbol === '.'){
        if(!this.state.commaUsed){
          if(operators.test(tempString) || this.state.answerDisplayed){
            tempString = '0.';
            this.setState({answerDisplayed: false});
          }else
            tempString += symbol;

          this.setState({
            commaUsed: true
          });
        }
      }else if(numbers.test(symbol)){
        if(tempString === '0' || operators.test(tempString) || this.state.answerDisplayed){  //Substitute operators or 0 from input with new input
          tempString = symbol;
          this.setState({answerDisplayed: false});
        }else{
          tempString += symbol;
        }
      }
    }

    if(operators.test(symbol)){  //Do the math
      let tempFirstVal;
      this.setState({commaUsed: false});
      
      if(this.state.firstValue === undefined || this.state.lastOperator === '='){
        tempFirstVal = parseFloat(tempString, 10);
      }else{
        tempFirstVal = this.mathOperations[this.state.lastOperator](this.state.firstValue, parseFloat(tempString, 10));
        if(this.state.lastOperator === '/' && parseInt(tempString, 10) === 0) tempFirstVal = 'Infinity'
      }
      
      if(symbol === '='){   //Display result
        tempString = this.round(tempFirstVal.toString());
        tempFirstVal = undefined;
        symbol = '';
        this.setState({
          commaUsed: false,
          answerDisplayed: true
        });
      }else{
        tempString = symbol;
      }

      this.setState({
        firstValue: tempFirstVal,
        lastOperator: symbol
      });
    }
    this.setState({
      screenText: this.checkForErrors(tempString)
    });
  }

  buttonClickHandlder(symbol) {
    this.processScreenText(symbol);
  }

  render() {
    return (
      <Wrapper className="App">
        <Screen mathOperation={this.state.screenText} />
        <ButtonGroup handleClick={this.buttonClickHandlder}/>
      </Wrapper>
    );
  }
}

export default App;
