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
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 10000,
  // offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function Marketplace({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  )
}

export default Marketplace
