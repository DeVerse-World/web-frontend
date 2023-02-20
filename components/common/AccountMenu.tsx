import Link from "next/link";
import React, { DOMAttributes, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/app_context";
import LoginModal from "../login/LoginModal";
import AuthService from "../../data/services/AuthService";
import FirebaseService from "../../data/services/FirebaseService";

function AccountMenu(props: DOMAttributes) {
  const { user, setUser, showLogin, setShowLogin, remoteConfig } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDashboardToggle, setShowDashboardToggle] = useState(false);

  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowDashboardToggle(remoteConfig).then(setShowDashboardToggle)
  }, [remoteConfig])

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

  return (
    <div id='account-dropdown' onPointerLeave={props.onPointerLeave}>
      <h5>Welcome {user?.name}</h5>
      <Link href="/account" className="no-underline text-white">Profile</Link>
      {showDashboardToggle &&
        <Link href="/creator-dashboard" className="no-underline text-white">
          Dashboard
        </Link>
      }
      {user != null && user.isBlogPostAdmin == true &&
        <Link href="/content-manager" className="no-underline text-white">
          Content manager
        </Link>
      }
      <span className="cursor-pointer" onClick={onClickLogout}>
        Logout
      </span>
    </div>
    // {showLogin && <LoginModal show={true} onHide={() => setShowLogin(false)} isAddMetamaskOnly={false} isAddGoogleOnly={false} isAddSteamOnly={false} fullscreen />}
  );
}

export default AccountMenu;
