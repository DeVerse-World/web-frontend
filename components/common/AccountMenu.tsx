import { useMetaMask } from "metamask-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Button, Image, NavDropdown } from "react-bootstrap";
import { AppContext } from "../contexts/app_context";
import LoginModal from "../login/LoginModal";
import AuthService from "../../data/services/AuthService";

function AccountMenu() {
  const { status, connect, account } = useMetaMask();
  const { user, setUser } = useContext(AppContext);
  const [boxContent, setBoxContent] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/");

  const onToggleMenu = (e) => {
    setShowDropdown(!showDropdown);
  }

  const onClickLogin = (e) => {
    setShowLogin(true)
  }

  const onClickLogout = (e) => {
    AuthService.logout().then(res => {
      if (!res) {
        window.alert("Fail to logout")
        return
      }
      window.alert("Succeed to logout")
      setShowLogin(false);
      setUser(null)
    })
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
        AuthService.connectToMetamask(account, null);
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

  let renderAccountButton = () => {
    if (user == null) {
      return (
        <button onClick={onClickLogin} className="text-white py-1 px-8 rounded-2xl bg-deverse-gradient text-sm h-[30px] md:h-[35px]">
          Login
        </button>
      )
    }
    return (
      <div className="text-white mr-24">

        <Image className="cursor-pointer" src={user?.avatar || "/images/placeholder.png"} width={40} height={40} roundedCircle onClick={onToggleMenu}/>

        <div id='account-dropdown' className={showDropdown ? "active" : null}>
          <h5>Welcome {user.name}</h5>
          <Link href="/account" >
            <div className="cursor-pointer">
              Profile
            </div>
          </Link>
          <div className="cursor-pointer" onClick={onClickLogout}>
            Logout
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {renderAccountButton()}
      {showLogin && <LoginModal show={true} onHide={() => setShowLogin(false)} isAddMetamaskOnly={false} isAddGoogleOnly={false} fullscreen />}
    </>

  );
}

export default AccountMenu;
