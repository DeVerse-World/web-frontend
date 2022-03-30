// import '../components/App.css';
import Header from '../components/Header';
import React, { useState, useEffect } from "react";
import axios from "axios"
import Contact from '../components/Contact'
import TokenInfo from '../components/TokenInfo'

function Home(props) {
  const [totalSupply, setTotalSupply] = useState("--")
  const [circulatingSupply, setCirculatingSupply] = useState("--")
  const [price, setPrice] = useState("--")
  const [mcap, setMcap] = useState("--")
  const [holders, setHolders] = useState("--")
  const [timerText, setTimerText] = useState(calcTime());

  var priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 8
  });

  var marketCapFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    // fetchPrice()
    // const timeoutID = window.setTimeout(() => {
    //   setTimerText(calcTime());
    // }, 1000);

    // return () => window.clearTimeout(timeoutID );
  })

  function calcTime(){
    const total = Date.parse('May 15 2021 GMT+4') - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
    return days + ":" + hours + ":" + minutes + ":" + seconds
  }

  function fetchPrice(){
    axios.get("/api/info")
    .then(res => {
      setTotalSupply(String(res.data.totalCoins).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      setCirculatingSupply(String(res.data.circulatingCoins).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      setPrice(priceFormatter.format(res.data.price))
      setMcap(marketCapFormatter.format(res.data.marketCap))
      setHolders(`${String(res.data.holders).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
    })
  }

  return (
    <>
    <Header/>
    <div style={{marginBottom: "100px"}}></div>
    <TokenInfo timerText={timerText} holders={holders} price={price} mcap={mcap}/>
    <div style={{marginBottom: "70px"}}></div>

    {/* <Details/> */}
    {/* <hr id="team"  style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Team/> */}
    {/* <hr id="roadmap" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Timeline /> */}
    {/* <hr id="token" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Token holders={holders} totalSupply={totalSupply} circulatingSupply={circulatingSupply} price={price} mcap={mcap}/>
    <hr id="partners" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Partners /> */}
    <hr id="contact" style={{marginBottom: "200px", marginTop: "200px"}}/>
    <Contact />
    <div style={{marginBottom: "200px"}}></div>
    </>
  );
}

export default Home;
