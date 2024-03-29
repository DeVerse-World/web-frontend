import { ReactNode, useState } from "react";
import RouteGuard from "./RouteGuard";
import Footer from "./Footer";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

type SidebarProps = {
  children?: ReactNode;
  tab?: ReactNode;
};

type SidebarItemProps = {
  onClick: any;
};

export default function LayoutWrapper(props: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <RouteGuard>
      <div className="bg-darkest text-lightest">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="body-container">
          <Navbar setSidebarOpen={setSidebarOpen} />
          <div
            className="flex flex-col justify-between"
            style={{ minHeight: `calc(100vh - 4rem)` }}
          >
            <div className="h-full">{props.children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
