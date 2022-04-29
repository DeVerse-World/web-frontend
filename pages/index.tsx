import IntroSection from '../components/home/IntroSection';
import React, { useState, useEffect } from "react";
import HomeNavbar from '../components/home/HomeNavbar'
import ProductSection from '../components/home/ProductsSection';
import WelcomeSection from '../components/home/WelcomeSection';
import HighlightFeatureSection from '../components/home/HighlightFeaturesSection';

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
    <>
      <HomeNavbar />
      <WelcomeSection />
      <IntroSection />
      <HighlightFeatureSection />
      <ProductSection />

      {/* <TokenInfo timerText={timerText} holders={holders} price={price} mcap={mcap} /> */}

      {/* <Details/> */}
      {/* <hr id="team"  style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Team/> */}
      {/* <hr id="roadmap" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Timeline /> */}
      {/* <hr id="token" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Token holders={holders} totalSupply={totalSupply} circulatingSupply={circulatingSupply} price={price} mcap={mcap}/>
    <hr id="partners" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Partners /> */}
      {/* <TeamMembersSection /> */}
      {/* <hr id="contact" style={{ marginBottom: "200px", marginTop: "200px" }} /> */}
      {/* <div style={{ marginBottom: "200px" }}></div> */}
    </>
  );
}

export default Home;
