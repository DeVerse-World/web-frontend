import React from "react";
import { Navbar, Nav, Image, NavLink } from 'react-bootstrap';
import AccountMenu from "../AccountMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
{/* <Button target="_blank" className="mr-2" href="https://www.deversenft.app/">Launch App</Button> */ }
function HomeNavbar(props) {
  return (
    <Navbar className="px-4 bg-gray-800 drop-shadow-sm" sticky="top" expand="lg" variant="dark">
      <Navbar.Brand href="/" >
        <Image
          src={"/images/logo.png"}
          width={50}
          height={30}
          className="d-inline-block align-top mr-2"
          alt="Deverse logo" />
        <Image
          src={"/images/logo-text.png"}
          width={120}
          height={150}
          className="d-inline-block align-top mr-2"
          alt="Deverse logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse >
        <Nav className="ms-auto">
          {/*<Nav.Link href="/showcase">Showcase</Nav.Link>*/}
          {/* <Nav.Link href="/#roadmap">Roadmap</Nav.Link>
          <Nav.Link href="/#token">Tokenomics</Nav.Link> */}
          {/*<Nav.Link rel="No-Refresh" href="/marketplace" >Marketplace</Nav.Link>*/}
          <Nav.Link className="text-white" href="/marketplace?tab=listing" >Marketplace</Nav.Link>
          <Nav.Link className="text-white" href="https://docs.deverse.world" target="_blank">Documentation</Nav.Link>
        </Nav>
        <Nav ><AccountMenu /></Nav>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default HomeNavbar;
