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

type ItemProps = {
    label: string,
    href: string,
    icon: any
}

function SidebarItem(props: ItemProps) {
    return (
        <Link href={props.href} style={{
            textDecoration: 'none',
            color: 'white'
        }} >
            <div className={`text-sm cursor-pointer deverse-sidebar-item flex flex-col items-center p-1`} >
                {props.icon}
                {props.label.toUpperCase()}
            </div>
        </Link>
    );
}

type SidebarProps = {
    children?: ReactNode;
    tab?: ReactNode;
}

function LayoutWraper(props: SidebarProps) {
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
                            <div className="flex flex-col px-1">
                                <SidebarItem label="Home" href="/" icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                                <SidebarItem label="Alpha" href="/alpha" icon={<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />} />
                                <SidebarItem label="Discovery" href="/marketplace" icon={<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />} />
                                <SidebarItem label="Create" href="/create" icon={<AiFillChrome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                                <SidebarItem label="Docs" href="/docs" icon={<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />} />
                            </div>
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

export default LayoutWraper