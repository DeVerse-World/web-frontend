import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";
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

function Sidebar(props: SidebarProps) {
    const router = useRouter();
    const { setIsMobileSidebarVisible, isMobileSidebarVisible } = useContext(AppContext);

    useEffect(() => {
        setIsMobileSidebarVisible(false);
    }, [router.pathname])

    const renderItem = (label: string, href: string, icon: any) => {
        let path = href.split('/').filter(v => v.length > 0)[0];
        let activeName = "";
        if ((path == undefined && router.pathname == "/") || (router.isReady && router.pathname.includes(path) && path.length > 0)) {
            activeName = "active";
        }
        return (
            <div className="w-[100%] cursor-pointer">
                <Link href={href} >
                    <div className={`flex flex-col items-center py-2 ${activeName}`} >
                        {icon}
                        <span>
                            {label.toUpperCase()}
                        </span>
                    </div>
                </Link>
            </div>

        );
    }

    return (
        <Nav id="deverse-sidebar" className={isMobileSidebarVisible ? "active" : null}>
            <div className="flex flex-row h-[100%]">
                <div className="flex flex-col">
                    {renderItem("Home", "/", <AiFillHome fontSize="1.5rem" color='rgb(97 198 208)' />)}
                    {renderItem("Alpha", "/alpha", <FaGamepad fontSize="1.5rem" color='rgb(97 198 208)' />)}
                    {renderItem("Subworlds", "/subworlds", <BiWorld fontSize="1.5rem" color='rgb(97 198 208)' />)}
                    {renderItem("Events", "/events", <BsCalendarEventFill fontSize="1.5rem" color='rgb(97 198 208)' />)}
                    {renderItem("Market", "/marketplace", <AiFillShopping fontSize="1.5rem" color='rgb(97 198 208)' />)}
                    {renderItem("Create", "/create", <SiCmake fontSize="1.5rem" color='rgb(97 198 208)' />)}
                    {renderItem("Mint", "/mint-nft", <GiMining fontSize="1.5rem" color='rgb(97 198 208)' />)}
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