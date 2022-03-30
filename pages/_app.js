import '../styles/globals.css'
import '../styles/Styles.css';
import '../styles/App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
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
        <nav className="border-b p-6">
          <Banner />
          <Navbar />
          <div className="flex mt-4">
          </div>
        </nav>
        <Component {...pageProps} />
        <Footer />
      </MetaMaskProvider>
    </AlertProvider>
  )
}

export default Marketplace
