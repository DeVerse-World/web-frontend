import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillShopping, AiFillHome } from 'react-icons/ai';
import { GiMining } from 'react-icons/gi';
import { SiCmake } from 'react-icons/si';
import { BiWorld } from 'react-icons/bi';
import { FaGamepad, FaInfoCircle } from 'react-icons/fa';
import Link from "next/link";
import { AppContext } from "./contexts/app_context";
import { BsCalendarEventFill } from "react-icons/bs";

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
        if ((path == undefined && router.pathname == "/") || (router.isReady && router.pathname.includes(path) && path.length > 0)) {
            setActiveClass("active");
        }
    },[router.isReady])
    
    return (
        <div className="w-[100%] cursor-pointer">
            <Link href={props.href} >
                <div className={`flex flex-col items-center py-2 ${activeClass}`} >
                    {props.icon}
                    <span>
                        {props.label.toUpperCase()}
                    </span>
                </div>
            </Link>
        </div>

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
                <div className="flex flex-col">
                    <SidebarItem label="Home" href="/" icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Alpha" href="/alpha" icon={<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Subworlds" href="/subworlds" icon={<BiWorld fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Events" href="/events" icon={<BsCalendarEventFill fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Market" href="/marketplace" icon={<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Create" href="/create" icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem label="Mint" href="/mint-nft" icon={<GiMining fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <Nav.Link href="https://docs.deverse.world" target="_blank">
                        <div className="flex flex-col items-center py-2">
                            <FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />
                            <span>
                                DOCS
                            </span>
                        </div>
                    </Nav.Link>
                </div>
                {props.children}
            </div>
        </Nav>
    )
}

export default Sidebar;