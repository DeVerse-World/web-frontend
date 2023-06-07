import React, { ReactNode, useContext, useState } from "react";
import useWindowWidth from "../hook/UseWindowWidth";
import { AppContext } from "./contexts/app_context";
import RouteGuard from "./RouteGuard";
import Footer from "./Footer";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

const appBarHeight = 60;

type SidebarProps = {
    children?: ReactNode;
    tab?: ReactNode;
}

type SidebarItemProps = {
    onClick: any;
}

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
}
