import '../styles/globals.css'
import '../styles/Styles.css';
import Footer from '../components/common/Footer'
import React, { useContext } from "react";
import { MetaMaskProvider } from "metamask-react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import Head from 'next/head'
import { AppContextProvider } from '../components/contexts/app_context';
import LoadingScreen from '../components/LoadingScreen';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 10000,
  // offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function DeverseApp({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <AppContextProvider>
        <MetaMaskProvider>
          <Head>
            <title>Deverse</title>
          </Head>
          <LoadingScreen/>
          <ScrollToTopButton />
          <Component {...pageProps} />
          <Footer />
        </MetaMaskProvider>
      </AppContextProvider>
    </AlertProvider>
  )
}

export default DeverseApp
