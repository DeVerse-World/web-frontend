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
import GoogleTagManager from '../components/analytics/GoogleTagManager';
import GTMHeader from '../components/analytics/GTMHeader';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import LoginModal from '../components/login/LoginModal';
// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 10000,
  // offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

// Add Loading indicator when change route
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function DeverseApp({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <SSRProvider>
        <AppContextProvider>
          <MetaMaskProvider>
            {/* <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

            <Script strategy="lazyOnload">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
            </Script> */}

            <Head>
              <title>Deverse</title>
            </Head>
            <GoogleTagManager tagId={process.env.NEXT_PUBLIC_GTM} />
            <noscript>
              <GTMHeader tagId={process.env.NEXT_PUBLIC_GTM} />
            </noscript>
            <LoadingScreen />
            {/* <ScrollToTopButton /> */}
            <div className='flex flex-col'>
              <HomeNavbar />
              <Component {...pageProps} />
            </div>
          </MetaMaskProvider>
        </AppContextProvider>
      </SSRProvider>
    </AlertProvider>
  )
}

export default DeverseApp
