import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { IconButton } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookICon from '@material-ui/icons/Facebook';
import { SiDiscord, SiTiktok } from 'react-icons/si';

function Footer(props) {
  return (
    <div className="flex flex-col bg-[url('/images/bg-highlight.png')]" style={{
      borderTop: "1px solid rgb(71 85 105)",
      textAlign: "center",
      color: "white",
    }}>
      <section className="flex flex-row flex-wrap justify-center pt-8 px-4">
        <h1 className="pr-2">Contact us:</h1>
        <div className="flex flex-row justify-center items-center">
          <IconButton style={{ color: "white", fontSize: "1.5rem" }} href="mailto:info@cosugames.com" target="_blank">
            <MailIcon fontSize="inherit" />
          </IconButton>
          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://t.me/DeverseWorld">
            <TelegramIcon />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://twitter.com/DeverseWorld">
            <TwitterIcon />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "1.5rem" }} target="_blank" href="https://discord.gg/z6qRJN9PAp">
            <SiDiscord style={{ padding: "0.15rem" }} />
          </IconButton>

          <IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://www.facebook.com/DeverseWorld/" >
            <FacebookICon />
          </IconButton>

          {/*<IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://www.instagram.com/deverse.nft/" >*/}
          {/*  <InstagramIcon />*/}
          {/*</IconButton>*/}

          {/*<IconButton style={{ color: "white" }} target="_blank" href="https://www.tiktok.com/@deverse_nft" >*/}
          {/*  <SiTiktok style={{ padding: "0.15rem" }} />*/}
          {/*</IconButton>*/}

          {/*<IconButton style={{ color: "white", fontSize: "2rem" }} target="_blank" href="https://github.com/Plutus-Gaming-NFTs-Reimagined" >*/}
          {/*  <GitHubIcon />*/}
          {/*</IconButton>*/}
        </div>
      </section>
      <section className="my-8">
        Copyright © Deverse 2021
      </section>
    </div>
  );
}

export default Footer;
