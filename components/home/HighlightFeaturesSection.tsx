import React from "react";
import { Image } from "react-bootstrap";

function HighlightFeatureSection(props) {
    return (
        <section className="text-white bg-[url('/images/bg-highlight.png')]">
            <div className="title mx-auto text-center text-6xl py-8 uppercase max-w-[700px]">
                What can you do in Deverse?
            </div>
            <div className="flex flex-row items-center justify-center py-4">
                <div className="order-1 flex flex-col max-w-[450px]">
                    <div className="text-3xl pl-8 pb-2 uppercase text-sky-400 font-bold">Unlimited Exploration</div>
                    <div className="text-lg pl-8">Discover a list of open worlds jointly constructed by the community: Playing battle royale games, hosting virtual events, showcasing NFT art galleries, etc</div>
                </div>
                <div className="order-2">
                    <Image src="/images/highlight-exploration.png" width={400} height={400} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center py-4">
                <div className="order-2 flex flex-col max-w-[450px]">
                    <div className="text-3xl pl-8 pb-2 uppercase text-sky-400 font-bold" >Unlimited Creation</div>
                    <div className="text-lg pl-8 order-1" >Use our in-game editor to customise items and design worlds/ events for casual users, as well as editor/ SDK for advanced developers</div>
                </div>
                <div className="order-1">
                    <Image src="/images/highlight-creation.png" width={400} height={400} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center py-4">
                <div className="order-1 flex flex-col max-w-[450px]">
                    <div className="text-3xl pl-8 pb-2 uppercase text-sky-400 font-bold" >Unlimited Earning</div>
                    <div className="text-lg pl-8">Earn by creating assets, tackling in-game quests events, serving certain social roles as well as contributing to the decentralised infrastructure</div>
                </div>
                <div className="order-2">
                    <Image src="/images/highlight-earning.png" width={400} height={400} />
                </div>
            </div>
        </section>
    );
}

export default HighlightFeatureSection;