import { MetaMaskProvider } from "metamask-react";
import Head from 'next/head'
import { AppContextProvider } from '../components/contexts/app_context';
import LoadingScreen from '../components/LoadingScreen';
import { SSRProvider } from 'react-bootstrap';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GTMHeader from "../components/analytics/GTMHeader";
import GoogleTagManager from "../components/analytics/GoogleTagManager";
import LayoutWrapper from "../components/LayoutWrapper";
import Script from "next/script";

// Add Loading indicator when change route
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function DeverseApp({ Component, pageProps }) {

  return (
    <SSRProvider>
      <AppContextProvider>
        <MetaMaskProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID || ''}>
            <Head>
              <title>Deverse World</title>
              <meta name="title" content="Deverse World Meow" />
              <meta name="description" content="hello there" />
              <meta name="keywords" content="metaverse, sandbox, unreal engine 5, deverse world, deverse, editor, building, simulation, gameplay, build game, develop game, creator, content, assets, nft, the sandbox, decentraland, roblox, multiverse, youtube, social, minecraft" />
              <meta property="og:site_name" content="Deverse World Meowing" />
              <meta property="og:image" content="https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/smudge-the-viral-cat.jpg" />
              <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXF38ZMELH" />
                <Script id="google-analytics">
                  {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-XXF38ZMELH');
                    gtag('config', 'AW-11255567082');
                  `}
                </Script>
            </Head>
            <noscript>
              <GTMHeader tagId={process.env.NEXT_PUBLIC_GTM} />
            </noscript>
            <GoogleTagManager tagId={process.env.NEXT_PUBLIC_GTM} />

            <LoadingScreen />
            {/* <ScrollToTopButton /> */}
            <LayoutWrapper>
              <Component {...pageProps} />
            </LayoutWrapper>
          </GoogleOAuthProvider>
        </MetaMaskProvider>
      </AppContextProvider>
    </SSRProvider>

  )
}

export default DeverseApp
