import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillShopping, AiFillHome, AiOutlineGlobal, AiFillPlusCircle } from 'react-icons/ai';
import { GiMining } from 'react-icons/gi';

function SidebarComponent(props: WithRouterProps) {

    const [selectedPath, setSelectedPath] = useState('');

    useEffect(() => {
        setSelectedPath(props.router.pathname);
    }, [props.router.pathname])

    const onSelectItem = (item: string) => {
        console.log(item)
    }

    return (
        <Nav onSelect={onSelectItem} className="bg-black max-h-[calc(100vh - 60px)] w-[80px] flex flex-col px-1">
            <SidebarItem href="/" isSelected={selectedPath == "/"} label="Home"
                icon={<AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />} />
            {/* <SidebarItem href="/alpha" isSelected={selectedPath == "/alpha"} label="Alpha" icon={<AiFillHome />} /> */}
            <SidebarItem href="/marketplace" isSelected={selectedPath == "/marketplace"} label="MARKET"
                icon={<AiFillShopping fontSize="1.5rem" color='rgb(97 198 208)' />} />
            <SidebarItem href="/mint-nft" isSelected={selectedPath == "/mint-nft"} label="Mint"
                icon={<GiMining fontSize="1.5rem" color='rgb(97 198 208)' />} />
            {/* <SidebarItem href="/events" isSelected={selectedPath == "/events"} label="EVENTS" icon={<AiFillShopping />} /> */}
            {/* <SidebarItem href="/hosting" isSelected={selectedPath == "/hosting"} label="Hosting" icon={<AiOutlineGlobal />} /> */}
        </Nav>
    )
}

type SidebarItemProps = {
    isSelected: boolean,
    href: string,
    label: string,
    icon: any
}

function SidebarItem(props: SidebarItemProps) {
    const bg = props.isSelected ? "bg-gray-700 rounded-2xl" : ""
    const label = props.isSelected ? "text-white" : "text-gray-500"
    return (
        <Nav.Item className="w-[100%]">
            <Nav.Link className={bg} href={props.href}>
                <div className="flex flex-col items-center " >
                    {props.icon}
                    <span className={label}>
                        {props.label.toUpperCase()}
                    </span>
                </div>
            </Nav.Link>
        </Nav.Item>
    )
}

const Sidebar = withRouter(SidebarComponent);
export default Sidebar;