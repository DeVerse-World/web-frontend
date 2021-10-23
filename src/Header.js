import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
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
    <section class="header py-5 text-white">
      <div className="header-spacing"><br/></div>
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center">
              <h6 class="mb-4 welcome-to-aux">WELCOME TO ALTURA</h6>
              <h1 class="title">Where Blockchain <br/> Meets Gaming</h1>
              <p class="mt-5 lead mb-5 secondary-text"> Altura is the next generation gaming NFT platform </p>
              <div>
                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="https://t.me/alturanft" color="white">
                   <TelegramIcon/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="https://twitter.com/altura_nft" color="white">
                   <TwitterIcon/>
                </IconButton>

                <IconButton style={{color: "white"}} target="_blank" href="https://discord.gg/cHW6SDMsEZ" color="white">
                  <SiDiscord style={{padding: "0.15rem"}}/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="https://www.reddit.com/r/AlturaNFT/" color="white">
                   <RedditIcon/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="https://www.instagram.com/Altura.nft/" color="white">
                   <InstagramIcon/>
                </IconButton>

                <IconButton style={{color: "white"}} target="_blank" href="https://www.tiktok.com/@altura_nft" color="white">
                  <SiTiktok style={{padding: "0.15rem"}}/>
                </IconButton>

                <IconButton style={{color: "white", fontSize: "2rem"}} target="_blank" href="https://github.com/Plutus-Gaming-NFTs-Reimagined" color="white">
                   <GitHubIcon/>
                </IconButton>
                <br/>
                <br/>
                <a target="_blank" href="/howtobuy" className="btn btn-primary mx-3 my-3">How To Buy</a>
                <a target="_blank" href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x8263CD1601FE73C066bf49cc09841f35348e3be0" className="btn btn-danger btn-large mx-3 my-3">Buy $ALU</a>
                <a target="_blank" href="https://poocoin.app/tokens/0x8263cd1601fe73c066bf49cc09841f35348e3be0" className="btn btn-primary btn-large mx-3 my-3">$ALU Chart</a>
              </div>




            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Header;
