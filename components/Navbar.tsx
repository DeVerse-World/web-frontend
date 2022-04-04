import React, { useState, useEffect, Component } from "react";
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import MetamaskBox from "./MetamaskBox";
import TelegramIcon from '@material-ui/icons/Telegram';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import GitHubIcon from '@material-ui/icons/GitHub';
function NavbarComp(props) {
  return (
    <Navbar className="pt-4 pb-4" expand="lg">
      <div className="container">
        <a href="/">
          <img
            style={{ border: "1px solid white", borderRadius: "50%" }}
            src="/images/logo.png"
            width="35"
            height="35"
            className="d-inline-block align-top mr-2"
            alt="Deverse logo"
          />
        </a>

        <Navbar.Brand className="navbar-deverse-title" style={{ fontSize: "", fontWeight: "" }} href="/">Deverse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link className="mr-3" href="/#team">Team</Nav.Link>
              <Nav.Link className="mr-3" href="/#roadmap">Roadmap</Nav.Link>
              <Nav.Link className="mr-3" href="/#token">Tokenomics</Nav.Link>
              <Nav.Link className="mr-3" href="/#contact">Contact</Nav.Link> */}
            <Nav.Link className="mr-3" rel="No-Refresh" href="/marketplace" >Marketplace</Nav.Link>
            {/* <Nav.Link className="mr-3 whitepaper-link" target="_blank" href="https://drive.google.com/file/d/1xjCoKdDAsmS2lvAcNglszxhu3l15lajb/view?usp=sharing">White Paper</Nav.Link> */}
            {/* <Nav.Link className="mr-3" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScnhw-EYb3Kfn6pNdVU-efPzouh7Sugy_70YD5Yosuyd1vY1g/viewform">Apply</Nav.Link> */}
            <Nav.Link className="mr-3" rel="No-Refresh" href="/account" >Profile</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {/* <Button target="_blank" className="mr-2" href="https://www.deversenft.app/">Launch App</Button> */}
            <Button>
              <MetamaskBox />
            </Button>
          </Nav>
          {/* <Nav className="ml-auto"> */}
          {/* </Nav> */}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarComp;
