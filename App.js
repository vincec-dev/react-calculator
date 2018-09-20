import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
      value: null,
      displayValue: '0',
      waitingForOperatorAnd: false,
      operator: null
    };

  handleClear() {
    this.setState({
      value: null,
      displayValue: '0',
      waitingForOperatorAnd: false,
      operator: null
    })
  }

  handleNumber(digit) {
    const { displayValue, waitingForOperatorAnd } = this.state;
    if(waitingForOperatorAnd) {
      this.setState({
        displayValue: String(digit),
        waitingForOperatorAnd: false
      })
    } else {
      this.setState({displayValue: displayValue==='0' ? String(digit) : displayValue + digit});
    }
  }

  handleOperator(nextOperator) {
    const { displayValue, operator, value } = this.state;
    const inputValue = parseFloat(displayValue);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if(value===null) {
      this.setState({value: inputValue})
    } else if (operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, inputValue)

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }

    this.setState({
      waitingForOperatorAnd: true,
      operator: nextOperator
    })
  }

  handleDot(dot) {
    const { displayValue } = this.state

    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperatorAnd: false
      })
    }
  }

  render() {
    const { displayValue } = this.state;
    return (
    <div className="App">
    <div id="full-calc">
      <div id="display" className="calc-row">
        <span id="steps">{displayValue}</span>
      </div>
      <div className="calc-row">
        <button id="clear" onClick={() => this.handleClear()}>A/C</button>
        <button id="divide" className="operator" onClick={() => this.handleOperator("/")}>/</button>
        <button id="multiply" className="operator" onClick={() => this.handleOperator("*")}>X</button>
      </div>
      <div className="calc-row">
        <button id="seven" className="number" onClick={() => this.handleNumber(7)}>7</button>
        <button id="eight" className="number" onClick={() => this.handleNumber(8)}>8</button>
        <button id="nine" className="number" onClick={() => this.handleNumber(9)}>9</button>
        <button id="subtract" className="operator" onClick={() => this.handleOperator("-")}>-</button>
      </div>
      <div className="calc-row">
        <button id="four" className="number" onClick={() => this.handleNumber(4)}>4</button>
        <button id="five" className="number" onClick={() => this.handleNumber(5)}>5</button>
        <button id="six" className="number" onClick={() => this.handleNumber(6)}>6</button>
        <button id="add" className="operator" onClick={() => this.handleOperator("+")}>+</button>
      </div>
      <div className="calc-row-large">
        <div id="row123">
          <button id="one" className="number" onClick={() => this.handleNumber(1)}>1</button>
          <button id="two" className="number" onClick={() => this.handleNumber(2)}>2</button>
          <button id="three" className="number" onClick={() => this.handleNumber(3)}>3</button>
          <button id="equals" className="equals" onClick={() => this.handleOperator("=")}>=</button>
        </div>
        <div id="row-zero-decimal">
          <button id="zero" className="zero" onClick={() => this.handleNumber(0)}>0</button>
          <button id="decimal" className="decimal" onClick={() => this.handleDot(".")}>.</button>
        </div>
      </div>
    </div>
  </div>);
}
}

export default App;
