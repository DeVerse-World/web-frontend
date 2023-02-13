import React, {  } from "react";
import { FaDiscord } from 'react-icons/fa';
import { AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import Image from "next/image";
import Link from "next/link";

function Footer(props) {
  return (
    <section id="section-footer">
      <div className="flex flex-col gap-2 items-center">
        <span className="flex flex-row gap-2">
          <Image
            src={"/images/logo.webp"}
            height={36}
            width={36}
            alt="Deverse logo" />
          <Image
            height={36}
            width={256}
            src={"/images/logo-text.webp"}
            alt="Deverse text logo" />
        </span>
        Copyright © Deverse World
      </div>
      <div className="flex flex-col">
        <Link href="privacy-policies" style={{
          textDecoration: 'none',
          color: 'white'
        }}><span className="cursor-pointer">Privacy Policies</span></Link>
        <Link href="term-of-use" style={{
          textDecoration: 'none',
          color: 'white'
        }}><span className="cursor-pointer">Term of Use</span></Link>
      </div>
      <div className="flex flex-col">
        <h3>Contact us</h3>
        <div className="flex flex-row flex-wrap justify-center items-center">
          <a id="contact-email" title="email" target="_blank" href="mailto:info@cosugames.com" >
            <MdEmail className="mx-2" color="white" fontSize="1.5rem" />
          </a>
          <a id="contact-twitter" title="twitter" target="_blank" href="https://twitter.com/DeverseWorld">
            <AiOutlineTwitter className="mx-2" color="white" fontSize="1.5rem" />
          </a>
          <a id="contact-discord" title="discord" target="_blank" href="https://discord.gg/z6qRJN9PAp">
            <FaDiscord className="mx-2" color="white" fontSize="1.5rem" />
          </a>
          <a id="contact-facebook" title="facebook" target="_blank" href="https://www.facebook.com/DeverseWorld/" >
            <AiFillFacebook className="mx-2" color="white" fontSize="1.5rem" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
