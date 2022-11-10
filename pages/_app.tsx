import '../styles/globals.css';
import '../styles/Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { MetaMaskProvider } from "metamask-react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Head from 'next/head'
import { AppContextProvider } from '../components/contexts/app_context';
import LoadingScreen from '../components/LoadingScreen';
import { SSRProvider } from 'react-bootstrap';
import GoogleTagManager from '../components/analytics/GoogleTagManager';
import GTMHeader from '../components/analytics/GTMHeader';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CommonLayout from '../components/common/CommonLayout';

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
  // This means it will either use the wrapper of the Component's layout declaration, or wrap it inside sitelayout (general)
  const getLayout = Component.getLayout || (page => <CommonLayout children={page} />)
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <SSRProvider>
        <AppContextProvider>
          <MetaMaskProvider>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}>
              <Head>
                <title>Deverse World</title>
                <meta name="title" content="Deverse World"/>
                <meta name="description" content="Your portal to the endless virtual world experiences, owned by the users"/>
                <meta name="keywords" content="metaverse, sandbox, unreal engine 5, deverse world, deverse, editor, building, simulation, gameplay, build game, develop game, creator, content, assets, nft, the sandbox, decentraland, roblox, multiverse, youtube, social, minecraft"/>
                <meta property="og:site_name" content="Deverse World"/>
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/logo.png?alt=media&token=67e233e2-fba3-4055-9050-41a2f36f759e"/>
              </Head>
              <noscript>
                <GTMHeader tagId={process.env.NEXT_PUBLIC_GTM} />
              </noscript>
              <GoogleTagManager tagId={process.env.NEXT_PUBLIC_GTM} />

              <LoadingScreen />
              {/* <ScrollToTopButton /> */}
              {getLayout(<Component {...pageProps} />)}
            </GoogleOAuthProvider>
          </MetaMaskProvider>
        </AppContextProvider>
      </SSRProvider>
    </AlertProvider>
  )
}

export default DeverseApp
