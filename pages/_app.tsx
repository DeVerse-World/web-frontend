import '../styles/globals.css';
import '../styles/Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { MetaMaskProvider } from "metamask-react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import Head from 'next/head'
import { AppContextProvider } from '../components/contexts/app_context';
import LoadingScreen from '../components/LoadingScreen';
import { SSRProvider } from 'react-bootstrap';
import HomeNavbar from '../components/common/HomeNavbar';
import Sidebar from '../components/Sidebar';

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
      <SSRProvider>
        <AppContextProvider>
          <MetaMaskProvider>
            <Head>
              <title>Deverse</title>
            </Head>
            <LoadingScreen />
            {/* <ScrollToTopButton /> */}
            <HomeNavbar />
            <div className='flex flex-row'>
              <Sidebar />
              <section style={{
                overflow: 'overlay',
                height: 'calc(100vh - 60px)',
                maxHeight: 'calc(100vh - 60px)',
                width: "100%"
              }}>
                <Component {...pageProps} />
              </section>
            </div>
          </MetaMaskProvider>
        </AppContextProvider>
      </SSRProvider>
    </AlertProvider>
  )
}

export default DeverseApp
