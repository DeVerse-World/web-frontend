import React from "react";
import { Navbar, Nav, Image, NavLink } from 'react-bootstrap';
import AccountMenu from "../AccountMenu";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

function Homebar(props: WithRouterProps) {
  return (
    <Navbar className="px-4 bg-black drop-shadow-sm h-[60px]" sticky="top" expand="lg" variant="dark" style={{
      borderBottom: "1px solid rgb(71 85 105)",
      height: 60
    }}>
      <Navbar.Brand href="/" >
        <Image
          src={"/images/logo.png"}
          className="d-inline-block  mr-2"
          alt="Deverse logo" />
        <Image
          src={"/images/logo-text.png"}
          className="d-inline-block"
          alt="Deverse logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse >
        <Nav className="ms-auto bg-black">
          {/* <Nav.Link href="/#roadmap">Roadmap</Nav.Link>
          <Nav.Link href="/#token">Tokenomics</Nav.Link> */}
          {/*<Nav.Link rel="No-Refresh" href="/marketplace" >Marketplace</Nav.Link>*/}
          {/* <Nav.Link className="text-white" href="/marketplace?tab=listing" >Marketplace</Nav.Link> */}
          <Nav.Link className="text-white" href="https://docs.deverse.world" target="_blank">Documentation</Nav.Link>
          <AccountMenu />
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
}

const HomeNavbar = withRouter(Homebar);
export default HomeNavbar;
