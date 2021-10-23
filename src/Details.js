import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';

function Details(props) {
  return (
    <div>
      <div className="container">
        <div className="details row" style={{marginBottom: "2.5rem"}}>
          <div className="align-self-center col-md-7 col-12">
          <h1 className="details-title">Smart NFTs</h1>
            <p className="secondary-text">Imagine a video game sword that gets duller every time it is used to slay a monster. Smart NFTs have properties that can change based on certain conditions.</p>
          </div>
          <div className="col align-self-center col-md-5 col-12">
            <img style={{width: "100%"}} src="/images/art/Sword.gif"/>
          </div>
        </div>

        <div className="details row" style={{textAlign: "right", marginBottom: "2.5rem"}}>
          <div className="align-self-center col-md-7 col-12 order-md-12">
          <h1 className="details-title">Loot Boxes Reimagined</h1>
            <p className="secondary-text">We want to create truly random loot boxes on the blockchain that drop NFTs with varying rarities when they are unlocked.</p>
          </div>
          <div className="col align-self-center col-md-5 col-12 order-md-1">
            <img style={{width: "100%"}} src="/images/art/lootboxanimation.gif"/>
          </div>
        </div>

        <div className="details row">
          <div className="align-self-center col-md-7 col-12">
          <h1 className="details-title">Cross-Platform Items</h1>
            <p className="secondary-text">Altura wants gamers to be able to use the same in-game items between multiple video games.</p>
          </div>
          <div className="col align-self-center col-md-5 col-12">
            <img  style={{width: "100%"}} src="/images/art/controller_big.png"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
