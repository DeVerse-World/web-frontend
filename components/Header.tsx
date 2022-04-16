import React, { useState, useEffect } from "react";

import {IconButton} from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import RedditIcon from '@material-ui/icons/Reddit';
import { SiDiscord, SiTiktok } from 'react-icons/si';

function Header(props) {
  return (
    <>
    <section className="header py-5 text-white">
      <div className="header-spacing"><br/></div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h6 className="mb-4 welcome-to-aux">Welcome to DeVerse</h6>
              <h1 className="title">A Sandbox <br/> <b>(De)</b>centralized Meta<b>(Verse)</b></h1>
              <p className="mt-5 lead mb-5 secondary-text">  </p>
              <div>
                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="" color="white">
                   <TelegramIcon/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="" color="white">
                   <TwitterIcon/>
                </IconButton>

                <IconButton style={{color: "white"}} target="_blank" href="" color="white">
                  <SiDiscord style={{padding: "0.15rem"}}/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="" color="white">
                   <RedditIcon/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="" color="white">
                   <InstagramIcon/>
                </IconButton>

                <IconButton style={{color: "white"}} target="_blank" href="" color="white">
                  <SiTiktok style={{padding: "0.15rem"}}/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="https://github.com/Plutus-Gaming-NFTs-Reimagined" color="white">
                   <GitHubIcon/>
                </IconButton>
                <br/>
                <br/>
                <a target="_blank" href="" className="btn btn-primary mx-3 my-3">How To Buy</a>
                <a target="_blank" href="" className="btn btn-danger btn-large mx-3 my-3">Buy $DVRS </a>
                <a target="_blank" href="" className="btn btn-primary btn-large mx-3 my-3">$DVRS Chart</a>
              </div>




            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Header;
