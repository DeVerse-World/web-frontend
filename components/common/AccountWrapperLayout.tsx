import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import BaseLayout from "./BaseLayout";
import HomeNavbar from "./HomeNavbar";
import TabHeader from "./TabHeader";

type Props = {
    children: ReactNode
}

const AccountWrapperLayout = (props: Props) => (
    <BaseLayout>
        <div className='flex flex-row bg-deverse '>
            <Sidebar />
            <section id='section-content' className='flex flex-col justify-between '>
                <span className="flex flex-row justify-between bg-black">
                    <span className="tab-bar flex-grow" >
                        <TabHeader href="/account">Info</TabHeader>
                        <TabHeader href="/account/wallet">Wallet</TabHeader>
                        <TabHeader href="/account/avatar">Avatars</TabHeader>
                        <TabHeader href="/account/events">Events</TabHeader>
                        <TabHeader href="/account/templates">Worlds</TabHeader>
                        <TabHeader href="/account/items">Items</TabHeader>
                        <TabHeader href="/account/settings">Settings</TabHeader>
                    </span>
                </span>
                <div className="grow">
                    {props.children}
                </div>
            </section>
        </div>
    </BaseLayout>
);

export const getAccountWrapperLayout = page => <AccountWrapperLayout>{page}</AccountWrapperLayout>;

export default AccountWrapperLayout;
