import React, { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Menu from './pages/Menu';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';
import Basket from './components/Cos';
import Reservation from './pages/Reservation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  const [basket, setBasket] = useState([]);

  return (
    <Router>
      <MainApp basket={basket} setBasket={setBasket} />
    </Router>
  );
}

function MainApp({ basket, setBasket }) {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/menu" exact element={<Menu basket={basket} setBasket={setBasket} />} />
        <Route path="/login" exact element={<Auth />} />
        <Route path="/register" exact element={<Auth />} />
        <Route path="/basket" exact element={<Basket basket={basket} setBasket={setBasket} />} />
        <Route path="/contact" exact element={<Contact />} /> 
        <Route path="/reservation" exact element={<Reservation />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
      {location.pathname !== '/basket' && location.pathname !== '/menu' && <Footer />}
    </div>
  );
}

export default App;
