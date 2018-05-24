import React, { Component } from 'react';

class Screen extends Component {
  render() {

    let screenStyle = {
      height: '4rem',
      width: '21rem',
      margin: '0 auto',
      marginBottom: '1rem',
      fontSize: '4rem',
      textAlign: 'right',
      backgroundColor: '#573',
      boxShadow: '3px 3px 3px #444, 5px 5px 5px rgba(255, 255, 255, .5), inset 5px 5px 10px rgba(0, 0, 0, .5), inset 7px 7px 3px rgba(0, 0, 0, .5), -3px -3px 3px rgba(0, 0, 0, .5),-5px -5px 10px rgba(0, 0, 0, .5)',
      borderRadius: '5px'
    };

    return (
      <div style={screenStyle}>
        {this.props.mathOperation}
      </div>
    );
  }
}

export default Screen;
