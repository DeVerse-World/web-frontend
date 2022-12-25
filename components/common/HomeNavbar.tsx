import React, { useContext } from "react";
import { Image } from 'react-bootstrap';
import AccountMenu from "./AccountMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import Link from "next/link";
import { AppContext } from "../contexts/app_context";
import { IoMdClose } from "react-icons/io";

function Homebar(props: WithRouterProps) {
  const { setIsMobileSidebarVisible, isMobileSidebarVisible } = useContext(AppContext);

  return (
    <section id="section-nav-bar" className="flex flex-row items-center justify-between px-2 bg-black drop-shadow-sm">
      <span id="btn-toggle-sidebar" className="md:hidden" onClick={() => setIsMobileSidebarVisible(!isMobileSidebarVisible)} >
        {isMobileSidebarVisible
          ? <IoMdClose fontSize="2rem" color="rgb(97 198 208)" />
          : <GiHamburgerMenu fontSize="2rem" color="rgb(97 198 208)" />}
      </span>
      <Link href="/" >
        <span className="flex flex-row gap-2 cursor-pointer">
          <Image
            src={"/images/logo.webp"}
            className="hidden sm:block"
            height={36}
            width={36}
            alt="Deverse logo" />
          <Image
            className="h-[32px] sm:h-[40px]"
            src={"/images/logo-text.webp"}
            alt="Deverse text logo" />
        </span>
      </Link>
      <div className="flex flex-row">
        <AccountMenu />
      </div>
    </section>
  )
}

const HomeNavbar = withRouter(Homebar);
export default HomeNavbar;
