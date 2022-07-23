import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Image, NavLink, Button, NavDropdown } from 'react-bootstrap';
import AccountMenu from "../AccountMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import wallet_service from "../../data/services/wallet_service";
import { useMetaMask } from "metamask-react";
import Link from "next/link";
import { AppContext } from "../contexts/app_context";
import { IoMdClose } from "react-icons/io";

function Homebar(props: WithRouterProps) {
  const { setIsMobileSidebarVisible, isMobileSidebarVisible } = useContext(AppContext);

  return (
    <section id="section-nav-bar" className="flex flex-row items-center justify-between px-4 bg-black drop-shadow-sm" style={{
      position: "sticky",
      // width: "100vw",
      top: 0,
      zIndex: 99,
      height: 60,
      borderBottom: "1px solid rgb(71 85 105)",
    }}>
      <span id="btn-toggle-sidebar" className="md:hidden" onClick={() => setIsMobileSidebarVisible(!isMobileSidebarVisible)} >
        {isMobileSidebarVisible
          ? <IoMdClose className="w-[40px] h-[40px]" fontSize="3.5rem" color="rgb(97 198 208)" />
          : <GiHamburgerMenu className="w-[40px] h-[40px]" fontSize="0.5rem" color="rgb(97 198 208)" />}
      </span>
      <Link href="/" >
        <span className="flex flex-row cursor-pointer">
          <Image
            src={"/images/logo.png"}
            className="w-[40px] h-[40px] hidden sm:block"
            alt="Deverse logo" />
          <Image
            src={"/images/logo-text.png"}
            className="h-[40px] mx-2"
            alt="Deverse text logo" />
        </span>
      </Link>


      <span className="flex flex-row">
        {/* <Nav.Item className="flex flex-row mx-2 items-center text-white rounded-md py-2 px-4 bg-deverse-gradient" onClick={() => {
          window.open("https://drive.google.com/file/d/1va5Nyvzbz0PfheMk2Ma10JVuN4rsGliH/view", "_blank")
        }} >
          <span className="me-2">Download</span>
          <AiFillWindows fontSize="1.5rem" />
        </Nav.Item> */}
        {/* <Nav.Link className="text-white" href="https://docs.deverse.world" target="_blank">Documentation</Nav.Link> */}
        <AccountMenu/>
      </span>
    </section>
  )
}

const HomeNavbar = withRouter(Homebar);
export default HomeNavbar;
