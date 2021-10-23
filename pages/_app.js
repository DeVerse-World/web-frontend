import '../styles/globals.css'
import '../styles/Styles.css';
import '../styles/App.css';
import Navbar from '../components/Navbar'
import Home from '../components/Home';
import HowToBuy from '../components/HowToBuy'
import Footer from '../components/Footer'
import Meme from '../components/Meme'
import LoginRequest from '../components/LoginRequest'
import Banner from '../components/Banner'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Link from 'next/link'
import { MetaMaskProvider } from "metamask-react";

function Marketplace({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
    <div>
      <nav className="border-b p-6">
        <Banner/>
        <Navbar/>
        <div className="flex mt-4">
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
    </MetaMaskProvider>
  )
}

export default Marketplace
