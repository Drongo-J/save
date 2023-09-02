// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Book from './components/book/Book';
import Footer from './components/footer/Footer';
import './App.css'

const App = () => {
  var routerStyle = {display: "flex", flexDirection: "column", justifyContent: "space-between"};
  return (
    <Router style={routerStyle}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
