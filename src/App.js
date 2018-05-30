import React, { Component } from 'react';
import styled from 'styled-components';
import Screen from './Components/Screen';
import ButtonGroup from './Components/ButtonGroup';
import { round, mathOperations } from './helpers/math';
import { isNumber, isOperator, checkForErrors } from './helpers/validation';

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
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.state = {
      screenText: '0',
      commaUsed: false,
      lastOperator: '',
      firstValue: undefined,
      answerDisplayed: false
    };
  }

  initializeCalculator() {
    this.setState({
      commaUsed: false,
      lastOperator: '',
      firstValue: undefined
    });
  }
  
  handleNumbers(char) {
    let string = this.state.screenText;

    if(char === '.' && !this.state.commaUsed){
      if(isOperator(string) || this.state.answerDisplayed){
        string = '0.';
        this.setState({answerDisplayed: false});
      }else
        string += '.';
  
      this.setState({
        commaUsed: true
      });
    }else if(isNumber(char)){
      if(string === '0' || isOperator(string) || this.state.answerDisplayed){
        string = char;
        this.setState({answerDisplayed: false});
      }else{
        string += char;
      }
    }
    
    return string;
  }

  displayValue(val) {
    this.setState({
      screenText: checkForErrors(val)
    });
  }

  calculate() {
    let tempFirstVal;
    
    if(this.state.firstValue === undefined){//Note: if = press then what
      tempFirstVal = parseFloat(this.state.screenText, 10);
    }else{
      tempFirstVal = mathOperations[this.state.lastOperator](this.state.firstValue, parseFloat(this.state.screenText, 10));

      const isDividedByZero = this.state.lastOperator === '/' && parseInt(this.state.screenText, 10) === 0;
      if(isDividedByZero){
        tempFirstVal = 'Infinity'
      }
    }

    return tempFirstVal;
  }

  buttonClickHandler(symbol) {
    let tempString;

    if(isOperator(symbol)){
      tempString = symbol;
      this.setState({
        firstValue: this.calculate(),
        lastOperator: symbol,
        commaUsed: false
      });
    } else if(symbol === 'C'){
      tempString = '0';
      this.initializeCalculator();
    }else if(symbol === '='){
      tempString = round(this.calculate().toString());
      this.initializeCalculator();
      this.setState({answerDisplayed: true});
    }else{
      const characterLimitNotReached = this.state.screenText.length < 9 || (this.state.commaUsed && this.state.screenText.length < 10);
      if(characterLimitNotReached){
        tempString = this.handleNumbers(symbol);
      }
    }

    if(tempString !== undefined)
      this.displayValue(tempString);
  }

  render() {
    return (
      <Wrapper className="App">
        <Screen mathOperation={this.state.screenText} />
        <ButtonGroup handleClick={this.buttonClickHandler}/>
      </Wrapper>
    );
  }
}

export default App;
