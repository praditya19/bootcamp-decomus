import React, { Component } from "react";
import Operan from "./Operan";

export default class StateProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makanan: "Bakso",
      minuman: "Es Teh",
    };
  }

  gantiMakanan = (makanan_baru) => {
    this.setState({ makanan: makanan_baru });
  };

  render() {
    return (
      <>
        <div>{this.state.makanan}</div>
        <button onClick={() => this.gantiMakanan("Soto")}>Ganti Makanan</button>
        <Operan makanan={this.state.makanan} />
        <div>{this.state.minuman}</div>
      </>
    );
  }
}
