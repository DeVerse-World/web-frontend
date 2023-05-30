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
import Button from './Button';
import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames';
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

const navigation = [
{ name: 'Projects', href: '#', icon: FolderIcon, current: false },
{ name: 'Deployments', href: '#', icon: ServerIcon, current: true },
{ name: 'Activity', href: '#', icon: SignalIcon, current: false },
{ name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
{ name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
{ name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]
const teams = [
{ id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
{ id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
{ id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]
const statuses = {
offline: 'text-gray-500 bg-gray-100/10',
online: 'text-green-400 bg-green-400/10',
error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
{
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
},
// More deployments...
]
const activityItems = [
{
    user: {
    name: 'Michael Foster',
    imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
},
// More items...
]

const appBarHeight = 60;

type SidebarProps = {
    children?: ReactNode;
    tab?: ReactNode;
}

type SidebarItemProps = {
    onClick: any;
}

// function Sidebar(props: SidebarItemProps) {
//     const router = useRouter();

//     return (
//         <div className="flex flex-col px-1">
//             {[
//                 { label: "Home", href: "/", icon: (<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />) },
//                 { label: "Alpha", href: "/alpha", icon: (<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />) },
//                 { label: "Explore", href: "/marketplace", icon: (<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />) },
//                 { label: "Create", href: "/create", icon: (<AiFillChrome fontSize="1.5rem" color='rgb(97 198 208)' />) },
//                 { label: "About", href: "/about", icon: (<RiTeamFill fontSize="1.5rem" color='rgb(97 198 208)' />) },
//                 // { label: "Stream", href: "/stream", icon: (<BsBroadcast fontSize="1.5rem" color='rgb(97 198 208)' />) },
//                 { label: "Docs", href: "https://docs.deverse.world", isExternal: true, icon: (<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />) },
//             ].map(item => {
//                 if (item.isExternal) {
//                     return <a
//                         className="text-white no-underline font-semibold"
//                         target="_blank"
//                         key={`sidebar-${item.label}`}
//                         href={item.href}  >
//                         <div className={styles.item} >
//                             {item.icon}
//                             {item.label.toUpperCase()}
//                         </div>
//                     </a>
//                 }
//                 const activeClass = router.pathname == item.href ? `${styles.item} ${styles.active}` : `${styles.item}`;
//                 return (
//                     <Link
//                         onClick={props.onClick}
//                         className="text-white no-underline font-semibold"
//                         key={`sidebar-${item.label}`}
//                         href={item.href}
//                         prefetch={false}
//                     >
//                         <div className={activeClass} >
//                             {item.icon}
//                             {item.label.toUpperCase()}
//                         </div>
//                     </Link>
//                 )
//             })}
//         </div>
//     )
// }

export default function LayoutWrapper(props: SidebarProps) {
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const isWindowSize = useWindowWidth(768);
    const { user } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <RouteGuard>
            <div className="min-h-screen bg-darkest">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="lg:pl-60 h-full">
                    <Navbar setSidebarOpen={setSidebarOpen} />
                    <div className="h-full">
                        {props.children}
                        <Footer />
                    </div>
                </div>
            </div>
        </RouteGuard>
    );
    return (
        <RouteGuard>
            <div className="flex flex-row items-center justify-between md:px-8 px-2 bg-darkest drop-shadow-sm"
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
                    <Link href="/" prefetch={false}>
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
                        loader={() => user.avatar || "/images/placeholder.webp"}
                        onClick={() => setShowDropdown(true)} />
                    :
                    <Button href="/login" primary>
                        Login
                    </Button>
                }
            </div>


            {showDropdown && <AccountMenu onPointerLeave={() => setShowDropdown(false)} />}
            <div className="flex flex-row bg-darkest" style={{ minHeight: `calc(100vh - ${appBarHeight}px)` }}>
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
