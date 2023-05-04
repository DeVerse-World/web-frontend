import Image from "next/image"
import Link from "next/link"
import React, { ReactNode, useContext, useState } from "react";
import useWindowWidth from "../hook/UseWindowWidth";
import { Nav, Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
import { AiFillChrome, AiFillHome } from "react-icons/ai";
import { FaGamepad, FaInfoCircle } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { SiCmake } from "react-icons/si";
import AccountMenu from "./AccountMenu";
import styles from '../styles/sidebar.module.css';
import { AppContext } from "./contexts/app_context";
import { GiHamburgerMenu } from "react-icons/gi";
import RouteGuard from "./RouteGuard";
import Footer from "./Footer";
import { BsBroadcast } from "react-icons/bs";

const appBarHeight = 60;

type SidebarProps = {
    children?: ReactNode;
    tab?: ReactNode;
}

type SidebarItemProps = {
    onClick: any;
}

function Sidebar(props: SidebarItemProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col px-1">
            {[
                { label: "Home", href: "/", icon: (<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Alpha", href: "/alpha", icon: (<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Explore", href: "/marketplace", icon: (<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Create", href: "/create", icon: (<AiFillChrome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "About", href: "/about", icon: (<RiTeamFill fontSize="1.5rem" color='rgb(97 198 208)' />) },
                // { label: "Stream", href: "/stream", icon: (<BsBroadcast fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Docs", href: "https://docs.deverse.world", isExternal: true, icon: (<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />) },
            ].map(item => {
                if (item.isExternal) {
                    return <a
                        className="text-white no-underline font-semibold"
                        target="_blank"
                        key={`sidebar-${item.label}`}
                        href={item.href}  >
                        <div className={styles.item} >
                            {item.icon}
                            {item.label.toUpperCase()}
                        </div>
                    </a>
                }
                const activeClass = router.pathname == item.href ? `${styles.item} ${styles.active}` : `${styles.item}`;
                return (<Link
                    onClick={props.onClick}
                    className="text-white no-underline font-semibold"
                    key={`sidebar-${item.label}`}
                    href={item.href}  >
                    <div className={activeClass} >
                        {item.icon}
                        {item.label.toUpperCase()}
                    </div>
                </Link>)
            })}
        </div>
    )
}

export default function LayoutWrapper(props: SidebarProps) {
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const isWindowSize = useWindowWidth(768);
    const { user } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <RouteGuard>
            <div className="flex flex-row items-center justify-between md:px-8 px-2 bg-black drop-shadow-sm"
                style={{
                    height: appBarHeight,
                    borderBottom: '1px solid rgb(71 85 105)',
                }}>
                <span className="flex flex-row gap-2 items-center">
                    {isWindowSize ? <Link href="/"><Image
                        src={"/images/logo.webp"}
                        height={24}
                        width={24}
                        alt="Deverse logo" /></Link>
                        : <GiHamburgerMenu size={24} color="#61c6d0" onClick={() => setOpenDrawer(true)} />
                    }
                    <Link href="/">
                        <Image
                            height={24}
                            width={180}
                            src={"/images/logo-text.webp"}
                            alt="Deverse text logo" />
                    </Link>

                </span>
                {user
                    ? <Image className="cursor-pointer" width={40} height={40} alt="avatar-img"
                        src={user.avatar || "/images/placeholder.webp"}
                        onClick={() => setShowDropdown(true)} />
                    :
                    <Link href="/login" ><a className="no-underline text-white py-1 px-8 rounded-2xl bg-deverse-gradient text-sm h-8">
                        Login</a>
                    </Link>

                }
            </div>


            {showDropdown && <AccountMenu onPointerLeave={() => setShowDropdown(false)} />}
            <div className="flex flex-row min-h-screen" >
                {isWindowSize && (
                    <Nav className="bg-black">
                        <div className="flex flex-row h-full">
                            <Sidebar onClick={() => setOpenDrawer(false)} />
                            {props.tab}
                        </div>
                    </Nav>
                )}
                <div className="flex-grow flex flex-col overflow-y-auto overflow-x-clip">
                    {props.children}
                    <Footer />
                </div>
            </div>
            <Offcanvas show={onOpenDrawer} onHide={() => setOpenDrawer(false)}>
                <Offcanvas.Body as={() =>
                    <Nav className="bg-black h-full">
                        <div className="flex flex-row ">
                            <Sidebar onClick={() => setOpenDrawer(false)} />
                            {props.tab}
                        </div>
                    </Nav>
                }>
                </Offcanvas.Body>
            </Offcanvas>
        </RouteGuard>
    )
}