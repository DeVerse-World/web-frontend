import Link from "next/link";
import React, { useContext, useState } from "react";
import { Image } from "react-bootstrap";
import { AppContext } from "../contexts/app_context";
import LoginModal from "../login/LoginModal";
import AuthService from "../../data/services/AuthService";

function AccountMenu() {
  const { user, setUser, showLogin, setShowLogin } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const onToggleMenu = (e) => {
    setShowDropdown(!showDropdown);
  }

  const onClickLogin = (e) => {
    setShowLogin(true)
  }

  const onClickLogout = (e) => {
    AuthService.logout().then(res => {
      if (res.isFailure()) {
        window.alert(res.error)
        return
      }
      window.alert("Logout successfully")
      setShowLogin(false);
      setUser(null)
    })
  }

  const renderAccountButton = () => {
    if (user == null) {
      return (
        <button onClick={onClickLogin} className="text-white py-1 px-8 rounded-2xl bg-deverse-gradient text-sm h-[30px] md:h-[35px]">
          Login
        </button>
      )
    }
    return (
      <div className="text-white">
        <Image className="cursor-pointer" src={user.avatar || "/images/placeholder.png"} width={40} height={40} roundedCircle
          onClick={onToggleMenu} />
        <div id='account-dropdown' className={showDropdown ? "active" : null} onPointerLeave={() => setShowDropdown(false)}>
          <h5>Welcome {user.name}</h5>
          <Link href="/account" >
            <span className="cursor-pointer">Profile</span>
          </Link>
          <Link href="/creator-dashboard" >
            <span className="cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/content-manager" >
            <span className="cursor-pointer">Content manager</span>
          </Link>
          <span className="cursor-pointer" onClick={onClickLogout}>
            Logout
          </span>
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
