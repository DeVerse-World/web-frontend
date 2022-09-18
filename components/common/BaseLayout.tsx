import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import HomeNavbar from "./HomeNavbar";

type Props = {
    children: ReactNode
}

const BaseLayout = (props: Props) => (
    <div className='flex flex-col'>
        <HomeNavbar />
        {props.children}
    </div>
);

export const getBaseLayout = page => <BaseLayout>{page}</BaseLayout>;

export default BaseLayout;