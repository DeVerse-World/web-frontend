import React, { useState, useEffect, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';

function HowToBuy(props) {

  let steps = [
    {title:
      "Connecting to Binance Smart Chain"
    , desc:
    <div>
      <a target="_blank" href="https://minexswap.gitbook.io/minex-documentation/connect-to-the-binance-smart-chain.-trust-wallet">Using trustwallet instead of metamask?</a>
    </div>,
    body: [
      {title: "Select settings from dropdown", body: "", image: "https://academy.binance.com/_next/image?url=https%3A%2F%2Fimage.binance.vision%2Feditor-uploads%2F47eadf5a6e684e199f8b178dd8c0dc89.png&w=1920&q=75"},
      {title: "Select the networks menu", body: "", image: "https://academy.binance.com/_next/image?url=https%3A%2F%2Fimage.binance.vision%2Feditor-uploads%2F13dfcf5d5d8d4427b7e657bbbdb575c4.png&w=1920&q=75"},
      {title: "Add the Binance smart chain network", body:
        <div>
          <br/>
          <ul>
            <li className="mb-3">Network Name: <strong>Smart Chain</strong></li>
            <li className="mb-3">New RPC URL: <strong>{"https://bsc-dataseed.binance.org"}</strong></li>
            <li className="mb-3">ChainID: <strong>56</strong></li>
            <li className="mb-3">Symbol: <strong>BNB</strong></li>
            <li className="mb-3">Block Explorer URL: <strong>{"https://bscscan.com"}</strong></li>
          </ul>
        </div>

      , image: ""},
      {title: "Select the network", body: "", image: "https://academy.binance.com/_next/image?url=https%3A%2F%2Fimage.binance.vision%2Feditor-uploads%2Fa7223b688ca149979b221122434b25f3.png&w=1920&q=75"},
    ]},

    {title: "Buying $ALU From Pancake Swap", body: [
      {title: "Head over to Pancake swap exchange", body:
        <div>
          <p>You must have BNB in your wallet to purchase ALU</p>
          <a href="https://exchange.pancakeswap.finance/#/swap" target="_blank" className="btn btn-primary">Open Pancake Swap</a>
        </div>, image: ""},

      {title: "Connect your wallet, by clicking 'connect' in the top right", body: "", image: ""},

      {title: "Click 'Select a token'", body: "", image: "https://ml8ygptwlcsq.i.optimole.com/KqGSM2A.LwXc~1d1f4/w:378/h:443/q:auto/https://www.securities.io/wp-content/uploads/2021/03/PancakeSwap-DEX-Interface.png"},
      {title: "Paste the $ALU contract address", body: "Contract address: 0x8263CD1601FE73C066bf49cc09841f35348e3be0", image: ""},
      {title: "Set the amount of $ALU you want to purchase and swap!", body: "", image: ""},


    ]}

  ]


  return (
    <>
    <div className="container">
      <br></br>
      <br/>
      <br/>
      <h1 className="heading">How To Buy ALU</h1>
      <p>Token address: 0x8263CD1601FE73C066bf49cc09841f35348e3be0</p>
      <a target="_blank" href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x8263CD1601FE73C066bf49cc09841f35348e3be0" className="btn btn-primary">Buy from Pancake Swap</a>

      <div className="mt-5">
        <ol>
          <li><a href="#Connecting to Binance Smart Chain">Connecting to Binance Smart Chain</a></li>
          <li><a href="#Buying $ALU From Pancake Swap">Buying $ALU From Pancake Swap</a></li>
        </ol>
      </div>


        <div className="steps mt-5">
          {
            steps.map((value, index) => {
            return (
              <div className="mb-5">
                <h2 id={value.title} className="mb-4"><strong>{`${index + 1}. ${value.title}`}</strong></h2>
                <div className="pl-5">
                  <p>{value.desc}</p>
                  {
                    value.body.map((value2, index2) => {
                      return (
                        <div className="mb-5">
                          <h5>{`${index2 + 1}. ${value2.title}`}</h5>
                          <p>{value2.body}</p>
                          <img style={{maxWidth: "100%", width: "25rem"}} src={value2.image}></img>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
        </div>

    </div>
    </>
  );
}

export default HowToBuy;
