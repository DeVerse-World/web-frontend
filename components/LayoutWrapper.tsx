import Image from "next/image"
import Link from "next/link"
import React, { ReactNode, useState } from "react";
import useWindowWidth from "../hook/UseWindowWidth";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { AiFillChrome, AiFillHome } from "react-icons/ai";
import { FaGamepad, FaInfoCircle } from "react-icons/fa";
import { SiCmake } from "react-icons/si";
import Footer from "./common/Footer";
import AccountMenu from "./common/AccountMenu";

const appBarHeight = 80;

type SidebarProps = {
    children?: ReactNode;
    tab?: ReactNode;
}

function SidebatItems() {
    const router = useRouter();

    return (
        <div className="flex flex-col px-1">
            {[
                { label: "Home", href: "/", icon: (<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Alpha", href: "/alpha", icon: (<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Discovery", href: "/marketplace", icon: (<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Create", href: "/create", icon: (<AiFillChrome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Docs", href: "/docs", icon: (<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />) },
            ]
                .map(item => {
                    const activeClass = router.pathname == item.href ? "active" : "";
                    return (<Link href={item.href} style={{
                        textDecoration: 'none',
                        color: 'white'
                    }} >
                        <div className={`text-sm cursor-pointer deverse-sidebar-item flex flex-col items-center p-1 ${activeClass}`} >
                            {item.icon}
                            {item.label.toUpperCase()}
                        </div>
                    </Link>)
                })}
        </div>
    )
}

function LayoutWrapper(props: SidebarProps) {
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const isWindowSize = useWindowWidth(768);

    return (
        <>
            <div className="flex flex-row items-center justify-between px-2 bg-black drop-shadow-sm"
                style={{
                    height: appBarHeight,
                    borderBottom: '1px solid rgb(71 85 105)',
                }}>
                <Link href="/" >
                    <span className="flex flex-row gap-2 cursor-pointer">
                        <Image
                            src={"/images/logo.webp"}
                            height={24}
                            width={24}
                            alt="Deverse logo" />
                        <Image
                            height={24}
                            width={180}
                            src={"/images/logo-text.webp"}
                            alt="Deverse text logo" />
                    </span>
                </Link>
                <AccountMenu />
            </div>
            <div className="flex flex-row" style={{ height: `calc(100vh - ${appBarHeight}px)` }}>
                {isWindowSize && (
                    <Nav className="bg-black">
                        <div className="flex flex-row h-full">
                            <SidebatItems />
                            {props.tab}
                        </div>
                    </Nav>
                )}
                <div className="flex-grow flex flex-col overflow-y-scroll">
                    {props.children}
                    <Footer />
                </div>
            </div>
        </>

    )
}

export default LayoutWrapper