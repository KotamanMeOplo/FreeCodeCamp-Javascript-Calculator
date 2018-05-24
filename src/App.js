import React, { Component } from 'react';
import Screen from './Components/Screen';
import Buttons from './Components/Buttons';

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonClickHandlder = this.buttonClickHandlder.bind(this);
    this.numbers = new RegExp(/^\d$/);
    this.operators = new RegExp(/^\/|\*|-|\+|=$/);
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
    return parseFloat(val, 10) > 999999999 || (isNaN(val) && !this.operators.test(val)) || /e/.test(val) ? 'Error' : val
  };

  round(strNum) {
    let numParts = strNum.split('.');
    let allowedDecimals = 9 - numParts[0].length;

    return (Math.round(parseFloat(strNum, 10) * Math.pow(10, allowedDecimals)) / Math.pow(10, allowedDecimals)).toString();
  }

  processScreenText(symbol) {
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
          if(this.operators.test(tempString) || this.state.answerDisplayed){
            tempString = '0.';
            this.setState({answerDisplayed: false});
          }else
            tempString += symbol;

          this.setState({
            commaUsed: true
          });
        }
      }else if(this.numbers.test(symbol)){
        if(tempString === '0' || this.operators.test(tempString) || this.state.answerDisplayed){  //Substitute operators or 0 from input with new input
          tempString = symbol;
          this.setState({answerDisplayed: false});
        }else{
          tempString += symbol;
        }
      }
    }

    if(this.operators.test(symbol)){  //Do the math
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
    let calcStyle = {
      backgroundColor: '#444',
      width: '24rem',
      margin: '0 auto',
      padding: '2rem',
      borderRadius: '25px',
      boxShadow: 'inset 7px 7px 7px #333, inset 10px 10px 10px rgba(255, 255, 255, .5), inset -5px -5px 5px rgba(0, 0, 0, .5),inset -10px -10px 10px rgba(0, 0, 0, .5), 5px 5px 15px rgba(0, 0, 0, .5), 15px 15px 5px rgba(0, 0, 0, .5)'
    };
    return (
      <div className="App" style={calcStyle}>
        <Screen mathOperation={this.state.screenText} />
        <Buttons handleClick={this.buttonClickHandlder}/>
      </div>
    );
  }
}

export default App;