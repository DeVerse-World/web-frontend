import React, { DOMAttributes, useContext, useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { AppContext } from "./contexts/app_context";
import AuthService from "../data/services/AuthService";
import FirebaseService from "../data/services/FirebaseService";
import { useRouter } from "next/router";
import { Menu, Transition } from '@headlessui/react'

import classNames from "classnames";

export default function AccountMenu(props: DOMAttributes) {
  const { user, remoteConfig, logOutUser } = useContext(AppContext);
  const router = useRouter();
  const [showDashboardToggle, setShowDashboardToggle] = useState(false);

  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowDashboardToggle(remoteConfig).then(setShowDashboardToggle)
  }, [remoteConfig])

  const onClickLogout = (e) => {
    AuthService.logout().then(res => {
      if (res.isFailure()) {
        console.error(res.error)
        return
      }
      logOutUser();
      router.replace('/');
    })
  }

  return user &&(
    <Menu as="div" className="relative">
      <Transition
        as={Fragment}
        show={props.showDropdown}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        onPointerLeave={props.onPointerLeave}
      >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-dark py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <Link href="/account" prefetch={false}>
              <a
                className={classNames(active ? 'bg-medium text-lightest' : '', 'block px-4 py-2 text-sm text-light', 'no-underline')}
              >
                Profile
              </a>
            </Link>
          )}
        </Menu.Item>
        {showDashboardToggle &&
          <Menu.Item>
            {({ active }) => (
              <Link href="/creator-dashboard" prefetch={false}>
                <a
                  className={classNames(active ? 'bg-medium text-lightest' : '', 'block px-4 py-2 text-sm text-light', 'no-underline')}
                >
                  Dashboard
                </a>
              </Link>
            )}
          </Menu.Item>
        }
        {user != null && user.isBlogPostAdmin &&
          <Menu.Item>
            {({ active }) => (
              <Link href="/content-manager" prefetch={false}>
                <a
                  className={classNames(active ? 'bg-medium text-lightest' : '', 'block px-4 py-2 text-sm text-light', 'no-underline')}
                >
                  Contact Manager
                </a>
              </Link>
            )}
          </Menu.Item>
        }
        <Menu.Item>
          {({ active }) => (
            <button type="button" className={classNames(active ? 'bg-medium' : '', 'block w-full text-left px-4 py-2 text-sm text-red-400', 'no-underline')} onClick={onClickLogout}>
              Log out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
  );
}