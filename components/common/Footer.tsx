import React, { useState, useEffect } from "react";
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import { AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import { MdEmail } from 'react-icons/Md';

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
          <a title="email" target="_blank" href="mailto:info@cosugames.com" >
            <MdEmail className="mx-2" color="white" fontSize="1.5rem" />
          </a>
          <a title="telegram" target="_blank" href="https://t.me/DeverseWorld" >
            <FaTelegramPlane className="mx-2" color="white" fontSize="1.5rem" />
          </a>
          <a target="_blank" href="https://twitter.com/DeverseWorld">
            <AiOutlineTwitter className="mx-2" color="white" fontSize="1.5rem"  />
          </a>
          <a target="_blank" href="https://discord.gg/z6qRJN9PAp">
            <FaDiscord className="mx-2" color="white" fontSize="1.5rem" />
          </a>
          <a target="_blank" href="https://www.facebook.com/DeverseWorld/" >
            <AiFillFacebook className="mx-2" color="white" fontSize="1.5rem" />
          </a>
        </div>
      </section>
      <section className="my-8">
        Copyright © Deverse 2021
      </section>
    </div>
  );
}

export default Footer;
