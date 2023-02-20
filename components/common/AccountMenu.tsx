import Link from "next/link";
import React, { DOMAttributes, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/app_context";
import AuthService from "../../data/services/AuthService";
import FirebaseService from "../../data/services/FirebaseService";
import { useRouter } from "next/router";

export default function AccountMenu(props: DOMAttributes) {
  const { user, setUser, remoteConfig } = useContext(AppContext);
  const router = useRouter();
  const [showDashboardToggle, setShowDashboardToggle] = useState(false);

  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowDashboardToggle(remoteConfig).then(setShowDashboardToggle)
  }, [remoteConfig])

  const onClickLogout = (e) => {
    AuthService.logout().then(res => {
      if (res.isFailure()) {
        window.alert(res.error)
        return
      }
      setUser(null);
      router.replace('/');
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
      {user != null && user.isBlogPostAdmin &&
        <Link href="/content-manager" className="no-underline text-white">
          Content manager
        </Link>
      }
      <span className="cursor-pointer" onClick={onClickLogout}>
        Logout
      </span>
    </div>
  );
}
