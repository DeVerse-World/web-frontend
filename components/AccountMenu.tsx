import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import wallet_service from "../data/services/wallet_service";
import WalletService from "../data/services/wallet_service";
import LoginModal from "./login/LoginModal";

function AccountMenu() {
  const { status, connect, account } = useMetaMask();
  const [boxContent, setBoxContent] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const onClickMenu = (e) => {
    setShowLogin(true)
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

  // let element = (
  //   <button onClick={connect} className="text-white p-2 rounded-md bg-deverse-gradient text-sm h-[35px] md:h-[40px]">
  //     {boxContent}
  //   </button>
  // );

  // if (status == "connected") {
  //   element = (
  //     <NavDropdown title={account.substring(0, 5) + ".." + account.slice(-5)} className="bg-deverse-gradient"
  //       id="account-dropdown"
  //       menuVariant="dark"
  //     // show={showDropdown}
  //     // onMouseEnter={() => setShowDropdown(true)}
  //     // onMouseLeave={() => setShowDropdown(false)}
  //     >
  //       {/* <NavDropdown.Item onClick={openAccountDashboard}>Dashboard</NavDropdown.Item> */}
  //     </NavDropdown>
  //   )
  // }

  return (
    <>
      <button onClick={onClickMenu} className="text-white py-1 px-8 rounded-2xl bg-deverse-gradient text-sm h-[30px] md:h-[35px]">
        Login
      </button>
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} fullscreen/>
    </>

  );
}

export default AccountMenu;
