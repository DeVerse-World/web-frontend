import Image from "next/image"
import Link from "next/link"
import React, { ReactNode, useContext, useState } from "react";
import useWindowWidth from "../hook/UseWindowWidth";
import { Nav, Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
import { AiFillChrome, AiFillFacebook, AiFillHome, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaGamepad, FaInfoCircle } from "react-icons/fa";
import { SiCmake } from "react-icons/si";
import AccountMenu from "./common/AccountMenu";
import { MdEmail } from "react-icons/md";
import styles from '../styles/sidebar.module.css';
import { AppContext } from "./contexts/app_context";
import { GiHamburgerMenu } from "react-icons/gi";

const appBarHeight = 60;

type SidebarProps = {
    children?: ReactNode;
    tab?: ReactNode;
}

type SidebarItemProps = {
    onClick: any;
}

function SidebatItems(props: SidebarItemProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col px-1">
            {[
                { label: "Home", href: "/", icon: (<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Alpha", href: "/alpha", icon: (<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Explore", href: "/marketplace", icon: (<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Create", href: "/create", icon: (<AiFillChrome fontSize="1.5rem" color='rgb(97 198 208)' />) },
                { label: "Docs", href: "/docs", icon: (<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />) },
            ].map(item => {
                const activeClass = router.pathname == item.href ? `${styles.item} ${styles.active}` : `${styles.item}`;
                return (<Link
                    onClick={props.onClick}
                    className="text-white no-underline"
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
        <>
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
                <div>
                    {user
                        ? <Image className="cursor-pointer" width={40} height={40} alt="avatar-img"
                            src={user?.avatar || "/images/placeholder.webp"}
                            onClick={() => setShowDropdown(true)} />
                        : <Link href="/login" className="no-underline text-white py-1 px-8 rounded-2xl bg-deverse-gradient text-sm h-8 md:h-12">
                            Login
                        </Link>
                    }
                </div>
            </div>
            {showDropdown && <AccountMenu onPointerLeave={() => setShowDropdown(false)} />}
            <div className="flex flex-row" style={{ height: `calc(100vh - ${appBarHeight}px)` }}>
                {isWindowSize && (
                    <Nav className="bg-black">
                        <div className="flex flex-row h-full">
                            <SidebatItems onClick={() => setOpenDrawer(false)} />
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
            <Offcanvas show={onOpenDrawer} onHide={() => setOpenDrawer(false)}>
                <Offcanvas.Body as={() =>
                    <Nav className="bg-black h-full">
                        <div className="flex flex-row ">
                            <SidebatItems onClick={() => setOpenDrawer(false)} />
                            {props.tab}
                        </div>
                    </Nav>
                }>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}