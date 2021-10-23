import React, { useState, useEffect, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';

function Partners(props) {
  return (
    <>
      <div className="container">
        <h1 className="heading">Partners</h1>
        <br/><br/>
        <div >
          <row className="row">
            <div className="col col-12 col-md-4 align-self-center text-center mb-4">
              <a target="_blank" href="https://riskmoon.com/">
                <img style={{width: "100%"}} src="/images/riskmoon.png"/>
              </a>
              <h1 style={{color: "black"}}>Riskmoon</h1>
            </div>

            <div style={{height: "100%"}} className="col col-12 col-md-4 align-self-center text-center mb-4">
              <a target="_blank" href="https://www.oxbull.tech/">
                <img style={{width: "100%"}} src="/images/oxbull.png"/>
              </a>
            </div>

            <div className="col col-12 col-md-4 align-self-center text-center mb-4">
              <a target="_blank" href="https://www.gains-associates.com/">
                <img style={{width: "100%"}} src="/images/gains.png"/>
              </a>
            </div>
          </row>
        </div>
      </div>
    </>
  );
}

export default Partners;
