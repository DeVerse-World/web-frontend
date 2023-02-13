import { ReactNode } from "react";
import Footer from "./common/Footer";
import TabHeader from "./common/TabHeader";
import CommonLayout from "./common/CommonLayout";

type Props = {
    children: ReactNode
}

const AlphaLayout = (props: Props) => (
    <CommonLayout>
        <section id='section-content' className='flex flex-col justify-between '>
            <span className="flex flex-row justify-between bg-black">
                <span className="tab-bar flex-grow" >
                    <TabHeader href="/alpha">Main</TabHeader>
                    <TabHeader href="/alpha/streaming">Online</TabHeader>
                    <TabHeader href="/alpha/rewards">Rewards</TabHeader>
                    <TabHeader href="/alpha/leaderboard">Leaderboard</TabHeader>
                </span>
            </span>
            {props.children}
            <Footer />
        </section>
    </CommonLayout>
);

export const getAlphaLayout = page => <AlphaLayout>{page}</AlphaLayout>;

export default AlphaLayout;
