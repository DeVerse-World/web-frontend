import React, { useState, useEffect, Component } from "react";

function TokenInfo(props) {
  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col-12 col-md-4 mb-0 mb-3">
            <p className="secondary-text mb-0">{props.price}</p>
            <p style={{ color: "#ABABAB" }}>Price</p>
          </div>

          <div className="col-12 col-md-4 mb-0 mb-3">
            <p className="secondary-text mb-0">{props.mcap}</p>
            <p style={{ color: "#ABABAB" }}>Market Cap</p>
          </div>

          <div className="col-12 col-md-4 mb-0 mb-3">
            <p className="secondary-text mb-0">{props.holders}</p>
            <p style={{ color: "#ABABAB" }}>Holders</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TokenInfo;
