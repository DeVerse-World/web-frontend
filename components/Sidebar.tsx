import { useRouter, withRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillShopping, AiFillHome, AiOutlineGlobal, AiFillPlusCircle } from 'react-icons/ai';
import { GiMining } from 'react-icons/gi';
import { SiCmake } from 'react-icons/si';
import { FaGamepad, FaInfoCircle } from 'react-icons/fa';
import Link from "next/link";
import { AppContext } from "./contexts/app_context";
import { zeroPad } from "ethers/lib/utils";

function Sidebar(props) {
    const router = useRouter();
    const { setIsMobileSidebarVisible, isMobileSidebarVisible } = useContext(AppContext);
    const [currentRoute, setCurrentRoute] = useState("/");
    useEffect(() => {
        if (!router.isReady)
            return;
        setCurrentRoute(router.pathname);
        setIsMobileSidebarVisible(false);
    }, [router.pathname])

    return (
        <Nav id="deverse-sidebar"
            style={{
                background: 'black',
                maxHeight: 'calc(100vh - 60px)',
                height: 'calc(100vh - 60px)',
                padding: '1px',
                zIndex:10
            }}
            className={isMobileSidebarVisible ? "active" : ""}>
            <div className="flex flex-row h-[100%]">
                <div className="flex flex-col">
                    <SidebarItem href="/" isSelected={currentRoute == "/"} label="Home"
                        icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem href="/alpha" isSelected={currentRoute == "/alpha"} label="Alpha"
                        icon={<FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem href="/marketplace" isSelected={currentRoute == "/marketplace"} label="MARKET"
                        icon={<AiFillShopping fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem href="/create" label="Create" isSelected={currentRoute == "/create"}
                        icon={<SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />} />
                    <SidebarItem href="/mint-nft" isSelected={currentRoute == "/mint-nft"} label="Mint"
                        icon={<GiMining fontSize="1.5rem" color='rgb(97 198 208)' />} />

                    <SidebarItem href="https://docs.deverse.world" label="Docs" isSelected={false} openNewTab={true}
                        icon={<FaInfoCircle fontSize="1.5rem" color='rgb(97 198 208)' />} />
                </div>
                {props.children}
            </div>
            {/* <SidebarItem href="/hosting" isSelected={selectedPath == "/hosting"} label="Hosting" icon={<AiOutlineGlobal />} /> */}

        </Nav>
    )
}

type SidebarItemProps = {
    isSelected: boolean,
    href: string,
    label: string,
    icon: any,
    openNewTab?: boolean
}

function SidebarItem(props: SidebarItemProps) {
    const bg = props.isSelected ? "bg-gray-700 rounded-2xl" : ""
    const label = props.isSelected ? "text-white" : "text-gray-500"

    const renderBody = () => {
        if (props.openNewTab) {
            return (
                <Nav.Link className={bg} href={props.href} target="_blank">
                    <div className="flex flex-col items-center py-2">
                        {props.icon}
                        <span className={label}>
                            {props.label.toUpperCase()}
                        </span>
                    </div>
                </Nav.Link>

            );
        }
        return (
            <Link href={props.href}>
                <div className="flex flex-col items-center py-2 cursor-pointer" >
                    {props.icon}
                    <span className={label}>
                        {props.label.toUpperCase()}
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <Nav.Item className="w-[100%]">
            <Nav.Item className={bg} >
                {renderBody()}
            </Nav.Item>
        </Nav.Item>
    )
}

export default Sidebar;