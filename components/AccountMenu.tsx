import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import wallet_service from "../data/services/wallet_service";
import WalletService from "../data/services/wallet_service";

function AccountMenu() {
  const { status, connect, account } = useMetaMask();
  const [boxContent, setBoxContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

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

  let element = (
    <button onClick={connect} className="text-white p-2 rounded-md bg-deverse-gradient text-sm h-[35px] md:h-[40px]">
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

export default AccountMenu;
