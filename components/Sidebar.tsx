import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillHome } from 'react-icons/ai';
import { SiCmake } from 'react-icons/si';
import { FaGamepad, FaInfoCircle } from 'react-icons/fa';
import Link from "next/link";
import { AppContext } from "./contexts/app_context";

type SidebarProps = {
    children?: ReactNode
}

type ItemProps = {
    label: string,
    href: string,
    icon: any
}

function SidebarItem(props: ItemProps) {
    const router = useRouter();
    const [activeClass, setActiveClass] = useState("");
    const path = props.href.split('/').filter(v => v.length > 0)[0];
    useEffect(() => {
        if (!router.isReady) return
        if ((path == undefined && router.pathname == "/") || (router.isReady && router.pathname.startsWith(`/${path}`) && path.length > 0)) {
            setActiveClass("active");
        } else {
            setActiveClass("");
        }
    }, [router.isReady, router.pathname])

    return (
        <Link href={props.href} >
            <div className={`w-[100%] text-sm cursor-pointer deverse-sidebar-item flex flex-col items-center p-2 ${activeClass}`} >
                {props.icon}
                {props.label.toUpperCase()}
            </div>
        </Link>
    );
}

function Sidebar(props: SidebarProps) {
    const router = useRouter();
    const { setIsMobileSidebarVisible, isMobileSidebarVisible } = useContext(AppContext);

    useEffect(() => {
        setIsMobileSidebarVisible(false);
    }, [router.pathname])

    return (
        <Nav id="deverse-sidebar" className={isMobileSidebarVisible ? "active" : null}>
            <div className="flex flex-row h-[100%]">
                <div className="flex flex-col px-1">
                    <SidebarItem label="Home" href="/" icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Alpha" href="/alpha" icon={<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Discovery" href="/marketplace" icon={<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Create" href="/create" icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Docs" href="/docs" icon={<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />} />
                </div>
                {props.children}
            </div>
        </Nav>
    )
}

export default Sidebar;