import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import WalletService from "../data/services/wallet_service";

function AccountMenu() {
  const { status, connect, account } = useMetaMask();
  const [boxContent, setBoxContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const onLogout = () => {
    alert('not yet implemented')
  }

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
        setBoxContent("Connecting to Metamask");
        break;
      case "connected":
        setBoxContent(account);
        WalletService.connectToMetamask(account);
        break;
      default:
        break;
    }
  }, [status])

  let element = (
    <Button onClick={connect} className="deverse-gradient">
      {boxContent}
    </Button>
  );

  if (status == "connected") {
    element = (
      <NavDropdown title={account.substring(0, 5) + ".." + account.slice(-5)} className="deverse-gradient"
        id="account-dropdown"
        // show={showDropdown}
        // onMouseEnter={() => setShowDropdown(true)}
        // onMouseLeave={() => setShowDropdown(false)}
      >
        {/*<NavDropdown.Item onClick={openAccountDashboard}>Dashboard</NavDropdown.Item>*/}
        {/*<NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>*/}
      </NavDropdown>
    )
  }

  return element;
}

export default AccountMenu;
