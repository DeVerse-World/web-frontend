import { memo, useContext, useState } from "react";
import { AppContext } from "../contexts/app_context";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/20/solid";
import AccountMenu from "../AccountMenu";
import { Button } from "react-bootstrap";

const Navbar = ({ setSidebarOpen }) => {
  // This call is triggered twice on page load.
  // The second time is in AccountMenu.tsx
  const { user } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between bg-gray-900 shadow-sm flex-grow">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-white lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex h-16 shrink-0 items-center lg:hidden">
        <Image
          className="h-8 w-auto"
          src="/images/logo.webp"
          alt="Deverse logo"
          height={32}
          width={32}
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-x-8">
        <a href="#" className="-m-1.5 p-1.5">
          {user ? (
            <>
              <span className="sr-only">Your profile</span>
              <Image
                className="h-8 w-8 rounded-full bg-gray-800"
                width={40}
                height={40}
                alt="avatar-img"
                src={user.avatar || "/images/placeholder.webp"}
                loader={() => user.avatar || "/images/placeholder.webp"}
                onClick={() => setShowDropdown(true)}
              />
              {showDropdown && (
                <AccountMenu
                  onPointerLeave={() => setShowDropdown(false)}
                  showDropdown={showDropdown}
                />
              )}
            </>
          ) : (
            <Button className="action-button" href="/login">
              Sign in
            </Button>
          )}
        </a>
      </div>
    </div>
  );
};

export default memo(Navbar);
