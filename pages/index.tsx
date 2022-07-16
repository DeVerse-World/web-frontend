import IntroSection from '../components/home/IntroSection';
import React, { useState, useEffect } from "react";
import ProductSection from '../components/home/ProductsSection';
import WelcomeSection from '../components/home/WelcomeSection';
import HighlightFeatureSection from '../components/home/HighlightFeaturesSection';
import Footer from '../components/common/Footer';
import Sidebar from '../components/Sidebar';

function Home(props) {
  // const [totalSupply, setTotalSupply] = useState("--")
  // const [circulatingSupply, setCirculatingSupply] = useState("--")
  // const [price, setPrice] = useState("--")
  // const [mcap, setMcap] = useState("--")
  // const [holders, setHolders] = useState("--")
  // const [timerText, setTimerText] = useState(calcTime());

  // useEffect(() => {
  // fetchPrice()
  // const timeoutID = window.setTimeout(() => {
  //   setTimerText(calcTime());
  // }, 1000);

  // return () => window.clearTimeout(timeoutID );
  // })

  // function calcTime() {
  //   const total = Date.parse('May 15 2021 GMT+4') - Date.parse((new Date()).toString());
  //   const seconds = Math.floor((total / 1000) % 60);
  //   const minutes = Math.floor((total / 1000 / 60) % 60);
  //   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  //   const days = Math.floor(total / (1000 * 60 * 60 * 24));
  //   return days + ":" + hours + ":" + minutes + ":" + seconds
  // }



  return (
      <div className='flex flex-row bg-deverse '>
        <Sidebar />
        <div className='main-content'>
          <WelcomeSection />
          <IntroSection />
          <HighlightFeatureSection />
          <ProductSection />
          <Footer />
        </div>
      </div>
  );
}

export default Home;
