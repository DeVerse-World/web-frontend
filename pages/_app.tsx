import '../styles/globals.css'
import '../styles/Styles.css';
import Footer from '../components/common/Footer'
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { MetaMaskProvider } from "metamask-react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import Head from 'next/head'

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
        <Head>
        <title>Deverse</title>
        </Head>
        <ScrollToTopButton />
        <Component {...pageProps} />
        <Footer />
      </MetaMaskProvider>
    </AlertProvider>
  )
}

export default Marketplace
