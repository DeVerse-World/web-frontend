import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { IconButton } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import RedditIcon from '@material-ui/icons/Reddit';
import { SiDiscord, SiTiktok } from 'react-icons/si';

function Footer(props) {
  return (
    <section className="bg-gray-600">
      {/* <div style={{ backgroundColor: "#dc3545", height: "60px", color: "white", textAlign: "center" }} className="banner text-center">
        <p className="banner-text"><strong><a style={{ color: "white", textDecoration: "none" }} target="_blank" href="https://www.instagram.com/deverse.nft/">Follow our official Instgram account 🚀</a></strong></p>
      </div> */}
      <div className="h-1 w-full bg-neutral-300"></div>
      <div className="flex flex-col h-auto" style={{
        textAlign: "center",
        left: "0",
        bottom: "0",

        color: "white",
        fontSize: "1.3rem"
      }}>
        <div className="flex flex-row justify-center">
          <a
            className="flex items-center no-underline shrink"
            style={{ color: "white", width: "fit-content" }}
            href="mailto:nam.nguyen@cosugames.com"
            target="_blank" >
            <IconButton style={{ color: "white", fontSize: "4rem" }}>
              <MailIcon fontSize="inherit" />
            </IconButton>
            <h1>Contact us</h1>
          </a>
        </div>
        <div className="flex flex-row justify-center items-center">
          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://t.me/deversenft">
            <TelegramIcon />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://twitter.com/deverse_nft">
            <TwitterIcon />
          </IconButton>

          <IconButton style={{ color: "white" }} target="_blank" href="https://discord.gg/cHW6SDMsEZ">
            <SiDiscord style={{ padding: "0.15rem" }} />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://www.reddit.com/r/deverseNFT/" >
            <RedditIcon />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://www.instagram.com/deverse.nft/" >
            <InstagramIcon />
          </IconButton>

          <IconButton style={{ color: "white" }} target="_blank" href="https://www.tiktok.com/@deverse_nft" >
            <SiTiktok style={{ padding: "0.15rem" }} />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://github.com/Plutus-Gaming-NFTs-Reimagined" >
            <GitHubIcon />
          </IconButton>
        </div>

        <div className="mt-8 mb-8">
          Copyright © deverse 2021
        </div>
      </div>
    </section>
  );
}

export default Footer;
