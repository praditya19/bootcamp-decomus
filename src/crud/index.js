import React, { Component } from "react";
import NavbarComponent from "./NavbarComponent";
import Tabel from "./Tabel";
import "bootstrap/dist/css/bootstrap.min.css";
import Formulir from "./Formulir";

export default class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukus: [],
      nama: "",
      deskripsi: "",
      harga: "",
      id: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.id === "") {
      this.setState({
        bukus: [
          ...this.state.bukus,
          {
            id: this.state.bukus.length + 1,
            nama: this.state.nama,
            deskripsi: this.state.deskripsi,
            harga: this.state.harga,
          },
        ],
      });
    } else {
      const selectedBuku = this.state.bukus
        .filter((buku) => buku.id !== this.state.id)
        .map((filterBuku) => {
          return filterBuku;
        });

      this.setState({
        bukus: [
          ...selectedBuku,
          {
            id: this.state.bukus.length + 1,
            nama: this.state.nama,
            deskripsi: this.state.deskripsi,
            harga: this.state.harga,
          },
        ],
      });
    }

    this.setState({
      id: "",
      nama: "",
      deskripsi: "",
      harga: "",
    });
  };

  editData = (id) => {
    console.log("id buku", id);
    const selectedBuku = this.state.bukus
      .filter((buku) => buku.id === id)
      .map((filterBuku) => {
        return filterBuku;
      });

    this.setState({
      nama: selectedBuku[0].nama,
      deskripsi: selectedBuku[0].deskripsi,
      harga: selectedBuku[0].harga,
      id: selectedBuku[0].id,
    });
  };

  hapusData = (id) => {
    const bukuBaru = this.state.bukus
      .filter((buku) => buku.id !== id)
      .map((filterBuku) => {
        return filterBuku;
      });

    this.setState({
      bukus: bukuBaru,
    });
  };
  render() {
    return (
      <div>
        <NavbarComponent />
        <div className="container mt-4">
          <Tabel
            bukus={this.state.bukus}
            editData={this.editData}
            hapusData={this.hapusData}
          />
          <Formulir
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
