import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { AppContext } from "../contexts/app_context";
import LoginModal from "../login/LoginModal";
import AuthService from "../../data/services/AuthService";
import FirebaseService from "../../data/services/FirebaseService";

function AccountMenu() {
  const { user, setUser, showLogin, setShowLogin, remoteConfig } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDashboardToggle, setShowDashboardToggle] = useState(false);

  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowDashboardToggle(remoteConfig).then(setShowDashboardToggle)
  }, [remoteConfig])

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
        <Image className="cursor-pointer" src={user.avatar || "/images/placeholder.webp"} width={40} height={40} roundedCircle
          onClick={onToggleMenu} />
        <div id='account-dropdown' className={showDropdown ? "active" : null} onPointerLeave={() => setShowDropdown(false)}>
          <h5>Welcome {user.name}</h5>
          <Link href="/account" >
            <span className="cursor-pointer">Profile</span>
          </Link>
          {showDashboardToggle ?
            <Link href="/creator-dashboard" >
              <span className="cursor-pointer">Dashboard</span>
            </Link>
            : null
          }
          {user != null && user.isBlogPostAdmin == true ?
            <Link href="/content-manager" >
              <span className="cursor-pointer">Content manager</span>
            </Link>
            : null
          }
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
      {showLogin && <LoginModal show={true} onHide={() => setShowLogin(false)} isAddMetamaskOnly={false} isAddGoogleOnly={false} isAddSteamOnly={false} fullscreen />}
    </>

  );
}

export default AccountMenu;
