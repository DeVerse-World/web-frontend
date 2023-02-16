import Image from "next/image"
import Link from "next/link"
import React, { ReactNode, useState } from "react";
import useWindowWidth from "../hook/UseWindowWidth";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { AiFillChrome, AiFillFacebook, AiFillHome, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaGamepad, FaInfoCircle } from "react-icons/fa";
import { SiCmake } from "react-icons/si";
import AccountMenu from "./common/AccountMenu";
import { MdEmail } from "react-icons/md";

const appBarHeight = 60;

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
                { label: "Explore", href: "/marketplace", icon: (<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Create", href: "/create", icon: (<AiFillChrome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Docs", href: "/docs", icon: (<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />) },
            ]
                .map(item => {
                    const activeClass = router.pathname == item.href ? "active" : "";
                    return (<Link key={`sidebar-${item.label}`} href={item.href} style={{
                        textDecoration: 'none',
                        color: 'white'
                    }} >
                        <div className={`text-sm cursor-pointer deverse-sidebar-item flex flex-col items-center px-1 py-2 ${activeClass}`} >
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
                    <section id="section-footer">
                        <div className="flex flex-col gap-2 items-center">
                            <span className="flex flex-row gap-2">
                                <Image
                                    src={"/images/logo.webp"}
                                    height={36}
                                    width={36}
                                    alt="Deverse logo" />
                                <Image
                                    height={36}
                                    width={256}
                                    src={"/images/logo-text.webp"}
                                    alt="Deverse text logo" />
                            </span>
                            Copyright © Deverse World
                        </div>
                        <div className="flex flex-col">
                            <Link href="privacy-policies" style={{
                                textDecoration: 'none',
                                color: 'white'
                            }}><span className="cursor-pointer">Privacy Policies</span></Link>
                            <Link href="term-of-use" style={{
                                textDecoration: 'none',
                                color: 'white'
                            }}><span className="cursor-pointer">Term of Use</span></Link>
                        </div>
                        <div className="flex flex-col items-center text-2xl">
                            Contact us
                            <div className="flex flex-row gap-2 flex-wrap justify-center items-center">
                                {[
                                    { title: 'email', href: "mailto:info@cosugames.com", icon: (<MdEmail color="white" fontSize="1.5rem" />) },
                                    { title: 'twitter', href: "https://twitter.com/DeverseWorld", icon: (<AiOutlineTwitter color="white" fontSize="1.5rem" />) },
                                    { title: 'discord', href: "https://discord.gg/z6qRJN9PAp", icon: (<FaDiscord color="white" fontSize="1.5rem" />) },
                                    { title: 'facebook', href: "https://www.facebook.com/DeverseWorld/", icon: (<AiFillFacebook color="white" fontSize="1.5rem" />) }
                                ].map(item => <a key={item.title} title={item.title} target="_blank" href={item.href} >{item.icon}</a>)
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default LayoutWrapper