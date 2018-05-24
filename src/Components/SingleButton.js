import React, { Component } from 'react';

class SingleButton extends Component {
  constructor(props) {
    super(props);
    this.clikcHandler = this.clikcHandler.bind(this);
    this.defaultStyle = {
      height: '3rem',
      width: '5rem',
      fontSize: '2rem',
      margin: '.5rem',
      borderRadius: '5px',
      boxShadow: 'inset -3px -3px 1px rgba(0, 0, 0, .5), 3px 3px 1px rgba(0, 0, 0, .8)',
      border: 'none',
      outline: 'none',
      transform: 'translate(0, 0)'
    };
    this.pressedStyle = {
      height: '3rem',
      width: '5rem',
      fontSize: '2rem',
      margin: '.5rem',
      borderRadius: '5px',
      boxShadow: 'inset -3px -3px 1px rgba(0, 0, 0, .5), 1px 1px 1px rgba(0, 0, 0, .8)',
      border: 'none',
      outline: 'none',
      transform: 'translate(2px, 2px)'
    };
    this.state = {buttonStyle: this.defaultStyle};
  }

  clikcHandler() {
    this.props.handleClick(this.props.symbol);
    this.setState({buttonStyle: this.pressedStyle})
    setTimeout(_ => {
      this.setState({buttonStyle: this.defaultStyle});
    }, 100);

  }

  render() {
    return (
      <button style={this.state.buttonStyle} onClick={this.clikcHandler}>{this.props.symbol}</button>
    );
  }
}

export default SingleButton;
