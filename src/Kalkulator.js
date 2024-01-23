import React, { Component } from "react";
import "./Kalkulator.css";

class Kalkulator extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      result: 0,
    };
  }

  handleClick = (value) => {
    this.setState((prevState) => ({
      input: prevState.input + value,
    }));
  };

  handleClear = () => {
    this.setState({
      input: "",
      result: 0,
    });
  };

  handleCalculate = () => {
    try {
      this.setState({
        result: eval(this.state.input),
      });
    } catch (error) {
      this.setState({
        result: "Error",
      });
    }
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          value={this.state.input}
          readOnly
          className="input-display"
        />
        <br />
        <button onClick={() => this.handleClick("1")}>1</button>
        <button onClick={() => this.handleClick("2")}>2</button>
        <button onClick={() => this.handleClick("+")} className="operator">
          +
        </button>
        <br />
        <button onClick={() => this.handleClick("3")}>3</button>
        <button onClick={() => this.handleClick("4")}>4</button>
        <button onClick={() => this.handleClick("-")} className="operator">
          -
        </button>
        <br />
        <button onClick={() => this.handleClick("5")}>5</button>
        <button onClick={() => this.handleClick("6")}>6</button>
        <button onClick={() => this.handleClick("*")} className="operator">
          x
        </button>
        <br />
        <button onClick={() => this.handleClick("7")}>7</button>
        <button onClick={() => this.handleClick("8")}>8</button>
        <button onClick={() => this.handleClick("/")} className="operator">
          /
        </button>
        <br />
        <button onClick={this.handleClear} className="clear">
          C
        </button>
        <button onClick={this.handleCalculate} className="equals">
          =
        </button>
        <br />
        <div className="result">Hasil: {this.state.result}</div>
      </div>
    );
  }
}

export default Kalkulator;
