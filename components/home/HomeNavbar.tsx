import React from "react";
import {Navbar, Nav, Image, NavLink} from 'react-bootstrap';
import AccountMenu from "../AccountMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
{/* <Button target="_blank" className="mr-2" href="https://www.deversenft.app/">Launch App</Button> */ }
function HomeNavbar(props) {
  return (
    <Navbar className="p-4 bg-gray-800 drop-shadow-sm bg-opacity-90" sticky="top" expand="lg">

      <Navbar.Brand href="/">
        <Image
          src={"/images/logo.png"}
          width={30}
          height={30}
          className="d-inline-block align-top mr-2"
          alt="Deverse logo" />

        Deverse
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/*<Nav.Link href="/showcase">Showcase</Nav.Link>*/}
          {/* <Nav.Link href="/#roadmap">Roadmap</Nav.Link>
          <Nav.Link href="/#token">Tokenomics</Nav.Link> */}
          {/*<Nav.Link rel="No-Refresh" href="/marketplace" >Marketplace</Nav.Link>*/}
          {/* <NavLink to={{pathname: "https://docs.deverse.world"}} target="_blank" >Docs</NavLink>*/}
            <a href="https://docs.deverse.world" target="_blank"> Documentation </a>
        </Nav>
        <Nav ><AccountMenu /></Nav>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default HomeNavbar;
