import React, { Component } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./crudFinalProject.css";

const Api_Url = process.env.REACT_APP_API_URL;

class PeminjamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peminjams: [],
      books: [],
      new: {
        namaPeminjam: "",
        namaBuku: "",
        tanggalKeluar: "",
        tanggalMasuk: "",
      },
      editingId: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
    this.fetchPeminjams();
  }

  fetchPeminjams = async () => {
    try {
      const response = await fetch(`${Api_Url}/api/peminjams`);
      if (!response.ok) {
        throw new Error("Failed to fetch borrowers");
      }
      const peminjams = await response.json();
      this.setState({ peminjams });
    } catch (error) {
      console.error("Error fetching borrowers:", error.message);
    }
  };

  fetchBooks = async () => {
    try {
      const response = await fetch(`${Api_Url}/api/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const books = await response.json();
      this.setState({ books: books || [] });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  handlePeminjamChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      new: { ...prevState.new, [name]: value },
    }));
  };

  addPeminjam = async () => {
    const { new: newPeminjam, editingId, books } = this.state;

    try {
      const selectedBook = books.find(
        (book) => book.nama === newPeminjam.namaBuku
      );

      if (!selectedBook) {
        throw new Error("Selected book not found");
      }

      newPeminjam.book = { id: selectedBook.id };

      const response = await fetch(
        `${Api_Url}/api/peminjams${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPeminjam),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add/edit borrower");
      }

      this.setState({
        new: {
          namaPeminjam: "",
          namaBuku: "",
          tanggalKeluar: "",
          tanggalMasuk: "",
        },
        editingId: null,
      });

      this.fetchPeminjams();
    } catch (error) {
      console.error("Error adding/editing borrower:", error.message);
    }
  };

  editPeminjam = async (id) => {
    try {
      const response = await fetch(`${Api_Url}/api/peminjams/${id}`);
      const selectedBorrower = await response.json();

      const selectedBook = this.state.books.find(
        (book) => book.id === selectedBorrower.book.id
      );

      if (!selectedBook) {
        throw new Error("Selected book not found");
      }

      const formattedTanggalMasuk = new Date(selectedBorrower.tanggalMasuk)
        .toISOString()
        .split("T")[0];
      const formattedTanggalKeluar = new Date(selectedBorrower.tanggalKeluar)
        .toISOString()
        .split("T")[0];

      this.setState({
        new: {
          id: selectedBorrower.id,
          namaPeminjam: selectedBorrower.namaPeminjam,
          namaBuku: selectedBook.nama,
          tanggalMasuk: formattedTanggalMasuk,
          tanggalKeluar: formattedTanggalKeluar,
          book: selectedBorrower.book,
        },
        editingId: id,
      });
      this.fetchPeminjams();
    } catch (error) {
      console.error("Error fetching borrower for editing:", error.message);
    }
  };

  deletePeminjam = async (id) => {
    try {
      await fetch(`${Api_Url}/api/peminjams/${id}`, {
        method: "DELETE",
      });

      this.setState({
        new: {
          namaPeminjam: "",
          namaBuku: "",
          tanggalKeluar: "",
          tanggalMasuk: "",
        },
        editingId: null,
      });

      this.fetchPeminjams();
    } catch (error) {
      console.error("Error deleting borrower:", error.message);
    }
  };

  render() {
    return (
      <div>
        <h2>Daftar Peminjam</h2>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Peminjam</th>
                <th>Nama Buku</th>
                <th>Tanggal Masuk</th>
                <th>Tanggal Keluar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.peminjams.map((borrower) => (
                <tr key={borrower.id}>
                  <td>{borrower.id}</td>
                  <td>{borrower.namaPeminjam}</td>
                  <td>{borrower.book ? borrower.book.nama : ""}</td>
                  <td>
                    {new Date(borrower.tanggalMasuk).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td>
                    {new Date(borrower.tanggalKeluar).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => this.editPeminjam(borrower.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => this.deletePeminjam(borrower.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="form-container">
          <Form>
            <Form.Group controlId="formNamaPeminjam">
              <Form.Label>Nama Peminjam:</Form.Label>
              <Form.Control
                type="text"
                name="namaPeminjam"
                value={this.state.new.namaPeminjam}
                onChange={this.handlePeminjamChange}
              />
            </Form.Group>

            <Form.Group controlId="formNamaBuku">
              <Form.Label>Nama Buku:</Form.Label>
              <Form.Control
                as="select"
                name="namaBuku"
                value={this.state.new.namaBuku}
                onChange={this.handlePeminjamChange}
              >
                <option value="">Pilih Buku</option>
                {this.state.books.map((book) => (
                  <option key={book.id} value={book.nama}>
                    {book.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTanggalMasuk">
              <Form.Label>Tanggal Masuk:</Form.Label>
              <Form.Control
                type="date"
                name="tanggalMasuk"
                value={this.state.new.tanggalMasuk}
                onChange={this.handlePeminjamChange}
              />
            </Form.Group>

            <Form.Group controlId="formTanggalKeluar">
              <Form.Label>Tanggal Keluar:</Form.Label>
              <Form.Control
                type="date"
                name="tanggalKeluar"
                value={this.state.new.tanggalKeluar}
                onChange={this.handlePeminjamChange}
              />
            </Form.Group>

            <Button variant="primary" type="button" onClick={this.addPeminjam}>
              {this.state.editingId !== null
                ? "Simpan Perubahan"
                : "Tambah Peminjam"}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default PeminjamList;
