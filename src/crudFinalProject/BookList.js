import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./crudFinalProject.css";

const Api_Url = process.env.REACT_APP_API_URL;

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      newBook: { nama: "", author: "", deskripsi: "", harga: "" },
      editingId: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const response = await fetch(`${Api_Url}/api/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const books = await response.json();
      this.setState({ books });
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  handleBookChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newBook: { ...prevState.newBook, [name]: value },
    }));
  };

  addBook = async () => {
    const { newBook, editingId } = this.state;

    try {
      if (editingId !== null) {
        await fetch(`${Api_Url}/api/books/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });
      } else {
        await fetch(`${Api_Url}/api/books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });
      }

      this.setState({
        newBook: { nama: "", author: "", deskripsi: "", harga: "" },
        editingId: null,
      });

      this.fetchBooks();
    } catch (error) {
      console.error("Error adding/editing book:", error);
    }
  };

  editBook = async (id) => {
    try {
      const response = await fetch(`${Api_Url}/api/books/${id}`);
      const selectedBook = await response.json();
      this.setState({
        newBook: { ...selectedBook },
        editingId: id,
      });
    } catch (error) {
      console.error("Error fetching book for editing:", error);
    }
  };

  deleteBook = async (id) => {
    try {
      await fetch(`${Api_Url}/api/books/${id}`, {
        method: "DELETE",
      });

      this.setState({
        newBook: { nama: "", author: "", deskripsi: "", harga: "" },
        editingId: null,
      });

      this.fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  render() {
    return (
      <div>
        <h2>Daftar Buku</h2>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Penulis</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.nama}</td>
                  <td>{book.author}</td>
                  <td>{book.deskripsi}</td>
                  <td>{book.harga}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => this.editBook(book.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => this.deleteBook(book.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="form-container">
          <Form>
            <Form.Group className="mb-3" controlId="formBookName">
              <Form.Label>Nama:</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={this.state.newBook.nama}
                onChange={this.handleBookChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBookAuthor">
              <Form.Label>Penulis:</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={this.state.newBook.author}
                onChange={this.handleBookChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBookDescription">
              <Form.Label>Deskripsi:</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi"
                value={this.state.newBook.deskripsi}
                onChange={this.handleBookChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBookPrice">
              <Form.Label>Harga:</Form.Label>
              <Form.Control
                type="text"
                name="harga"
                value={this.state.newBook.harga}
                onChange={this.handleBookChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.addBook}>
              {this.state.editingId !== null
                ? "Simpan Perubahan"
                : "Tambah Buku"}
            </Button>
          </Form>{" "}
        </div>
      </div>
    );
  }
}

export default BookList;
