import React, { useState, useEffect, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import RedditIcon from '@material-ui/icons/Reddit';
import {IconButton} from '@material-ui/core';

function Meme(props) {
  return (
    <div>
      <br/>
      <br/>
      <div className="container">
        <h1 className="heading">Meme of the Week!</h1>
        <h3 >$100 prize every single week!</h3>

        <br/>
        <br/>
        <h5>To enter the competiton:</h5>

          <ul>
            <li>
              <a target="_blank" href="https://t.me/deversenft" >Join our Telegram</a>
            </li>

            <li>
              <a target="_blank" href="https://twitter.com/deverse_nft" >Follow us on Twitter</a>
            </li>

            <li>
              <a target="_blank" href="https://www.reddit.com/r/deverseNFT/" >Create a meme and post it to our subreddit </a>
            </li>
            <IconButton style={{fontSize: "2rem"}} target="_blank" href="https://t.me/deversenft" color="white">
               <TelegramIcon/>
            </IconButton>
            <IconButton style={{fontSize: "2rem"}} target="_blank" href="https://twitter.com/deverse_nft" color="white">
               <TwitterIcon/>
            </IconButton>
            <IconButton style={{fontSize: "2rem"}} target="_blank" href="https://www.reddit.com/r/deverseNFT/" color="white">
               <RedditIcon/>
            </IconButton>
            <br/>
          </ul>

          <h5>Rules:</h5>
          <ul>
            <li><strong>If the meme is about deverse a $20 bonus will be awarded if it wins</strong></li>
            <li>The meme with the most upvotes that week will win</li>
            <li>The meme must be original</li>
            <li>The meme must be in English</li>
            <li>The meme can be about anything</li>
          </ul>
      </div>
    </div>
  )
}

export default Meme;
