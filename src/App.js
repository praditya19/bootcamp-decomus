import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./crud/NavbarComponent";
import BookList from "./crudFinalProject/BookList";
import PeminjamList from "./crudFinalProject/PeminjamList";

const App = () => {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/peminjams" element={<PeminjamList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
