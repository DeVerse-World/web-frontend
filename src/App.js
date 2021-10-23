import './App.css';
import React, { useEffect } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './Navbar'
import Home from './Home';
import HowToBuy from './HowToBuy'
import Footer from './Footer'
import Meme from './Meme'
import LoginRequest from './LoginRequest'
import Banner from './Banner'

function App() {

  return (
    <>
      <Banner/>
      <Navbar/>
      <Router className="app">
        <Route path="/" exact render={(props) => (<Home {...props}/>)}/>
        <Route path="/howtobuy" exact render={(props) => (<HowToBuy {...props}/>)} />
        <Route path="/meme" exact render={(props) => (<Meme {...props}/>)} />
        <Route path="/login/:key" exact render={(props) => (<LoginRequest {...props}/>)} />
      </Router>
      <Footer />
    </>
  );
}

export default App;
