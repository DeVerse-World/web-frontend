import React from "react";
import { Image } from "react-bootstrap";

const shadowEffect: React.CSSProperties = {
    textShadow: "-1.5px -1.5px #FF0000,1.5px 1.5px #0000FF"
}

const secondaryShadowEffect: React.CSSProperties = {
    // textShadow: "-1px -1px 5px #FF0000, 1px 1px 5px #0000FF"
}

function HighlightFeatureSection(props) {
    return (
        <section className="text-white bg-gray-800">
            <div className="col-lg-8 mx-auto text-center text-6xl font-bold py-8 uppercase max-w-[700px]">
                What can you do in Deverse?
            </div>
            <div className="flex flex-row items-center justify-center bg-[url('/images/bg-pattern-2.png')] py-4">
                <div className="order-1 flex flex-col max-w-[450px] ">
                    <div className="text-[30px] md:text-[40px] pl-8" style={shadowEffect}>Unlimited Exploration</div>
                    <div className="text-[22px] pl-8">Discover a list of open worlds jointly constructed by the community: 
                    <span className="text-orange-500"> Playing battle royale games, hosting virtual events, showcasing NFT art galleries, etc</span></div>
                </div>
                <div className="order-2">
                    <Image src="/images/highlight-exploration.png" width={400} height={400} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center bg-[url('/images/bg-pattern-1.png')] bg-blend-luminosity py-4">
                <div className="order-2 flex flex-col max-w-[450px]">
                    <div className="text-[30px] md:text-[40px] pl-8" style={shadowEffect}>Unlimited Creation</div>
                    <div className="order-1 text-[22px] pl-8" style={secondaryShadowEffect}>Use our in-game editor to customise items and design worlds/ events for casual users, as well as editor/ SDK for advanced developers</div>
                </div>
                <div className="order-1">
                    <Image src="/images/highlight-creation.png" width={500} height={500} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center bg-black bg-[url('/images/bg-pattern-3.png')] py-4">
                <div className="order-1 flex flex-col max-w-[450px]">
                    <div className="text-[30px] md:text-[40px] pl-8" style={shadowEffect}>Unlimited Earning</div>
                    <div className="text-[22px] pl-8">Earn by creating assets, tackling in-game quests events, serving certain social roles as well as contributing to the decentralised infrastructure</div>
                </div>
                <div className="order-2">
                    <Image src="/images/highlight-earning.png" width={400} height={400} />
                </div>
            </div>
        </section>
    );
}

export default HighlightFeatureSection;