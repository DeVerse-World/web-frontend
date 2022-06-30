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
import { AiFillWindows } from "react-icons/ai";

function Homebar(props: WithRouterProps) {
  const { setIsMobileSidebarVisible, isMobileSidebarVisible } = useContext(AppContext);
  const { status, connect, account } = useMetaMask();
  const [boxContent, setBoxContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const openAccountDashboard = () => {
    window.location.href = "/account";
  }

  useEffect(() => {
    switch (status) {
      case "initializing":
        setBoxContent("Syncing");
        break;
      case "unavailable":
        setBoxContent("Metamask unavailable");
        break;
      case "notConnected":
        setBoxContent("Connect to Metamask");
        break;
      case "connecting":
        setBoxContent("Connecting");
        break;
      case "connected":
        setBoxContent(account);
        wallet_service.connectToMetamask(account);
        break;
      default:
        break;
    }
  }, [status])


  const renderAccount = () => {
    let element = (
      <button onClick={connect} className="text-white p-2 rounded-md bg-deverse-gradient h-[40px]">
        {boxContent}
      </button>
    );

    if (status == "connected") {
      element = (
        <NavDropdown title={account.substring(0, 5) + ".." + account.slice(-5)} className="bg-deverse-gradient"
          id="account-dropdown"
          menuVariant="dark"
        // show={showDropdown}
        // onMouseEnter={() => setShowDropdown(true)}
        // onMouseLeave={() => setShowDropdown(false)}
        >
          {/* <NavDropdown.Item onClick={openAccountDashboard}>Dashboard</NavDropdown.Item> */}
        </NavDropdown>
      )
    }

    return element;
  }

  return (
    <div className="flex flex-row items-center justify-between px-8 bg-black drop-shadow-sm" style={{
      position: "sticky",
      // width: "100vw",
      top: 0,
      zIndex: 99,
      height: 60,
      borderBottom: "1px solid rgb(71 85 105)",
    }}>

      <Link href="/" >
        <span className="flex flex-row cursor-pointer">
          <Image
            src={"/images/logo.png"}
            className="w-[40px] h-[40px]"
            alt="Deverse logo" />
          <Image
            src={"/images/logo-text.png"}
            className="h-[40px] mx-2 deverse-logo"
            alt="Deverse text logo" />
        </span>
      </Link>
      {/* <GiHamburgerMenu className="w-[40px] h-[40px]" onClick={() => setIsMobileSidebarVisible(!isMobileSidebarVisible)} /> */}
      <span className="flex flex-row">
        <Nav.Item className="flex flex-row mx-2 items-center text-white rounded-3xl py-2 px-4 bg-deverse-gradient" onClick={() => {
          window.open("https://drive.google.com/file/d/1va5Nyvzbz0PfheMk2Ma10JVuN4rsGliH/view", "_blank")
        }} >
          <span className="me-2">Download</span>
          <AiFillWindows fontSize="1.5rem" />
        </Nav.Item>
        {/* <Nav.Link className="text-white" href="https://docs.deverse.world" target="_blank">Documentation</Nav.Link> */}
        {renderAccount()}
      </span>

    </div>
  )

  return (
    <Navbar className="px-4 bg-black drop-shadow-sm h-[60px]" sticky="top" expand="lg" variant="dark" style={{
      borderBottom: "1px solid rgb(71 85 105)",
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
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse >
      
      </Navbar.Collapse> */}

      <Nav.Link className="text-white" href="https://docs.deverse.world" target="_blank">Documentation</Nav.Link>
      <AccountMenu />

      {/* <Nav className="ms-auto bg-black"> */}
      {/* <Nav.Link href="/#roadmap">Roadmap</Nav.Link>
          <Nav.Link href="/#token">Tokenomics</Nav.Link> */}
      {/*<Nav.Link rel="No-Refresh" href="/marketplace" >Marketplace</Nav.Link>*/}
      {/* <Nav.Link className="text-white" href="/marketplace?tab=listing" >Marketplace</Nav.Link> */}

      {/* </Nav> */}
    </Navbar >
  );
}

const HomeNavbar = withRouter(Homebar);
export default HomeNavbar;
