import { ReactNode } from "react";
import DownloadDemoButton from "../../components/DownloadDemoButton";
import Footer from "../../components/common/Footer";
import TabHeader from "../../components/common/TabHeader";
import CommonLayout from "../../components/common/CommonLayout";

type Props = {
    children: ReactNode
}

const AlphaLayout = (props: Props) => (
    <CommonLayout>
        <section id='section-content' className='flex flex-col justify-between '>
            <span className="flex flex-row justify-between bg-black">
                <span className="tab-bar flex-grow" >
                    <TabHeader href="/alpha">Play</TabHeader>
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
