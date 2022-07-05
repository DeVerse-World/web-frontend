import React from "react";
import { Image } from "react-bootstrap";

function HighlightFeatureSection(props) {
    return (
        // <div className="flex flex-row items-center justify-center bg-gradient-to-r from-blue-800 to-blue-400 p-4">
        <section id="section-highlight" className="text-white ">
            <div style={{
                // backgroundImage: "radial-gradient(closest-side, rgb(22, 74, 124), rgba(39, 141, 202,0.8))",
                // backgroundBlendMode: "overlay"
            }}>
                {/* <div className="deverse-title mx-auto text-center text-6xl py-8 uppercase max-w-[700px] bg-deverse-gradient txt-deverse-gradient">
                What can you do in Deverse?
            </div> */}
                {/* <div className="flex flex-row items-center justify-center py-4 bg-gradient-to-b from-blue-800/75 to-blue-400/75"> */}
                <div className="flex flex-row items-center justify-center py-4 mx-auto w-fit">
                    <div className="order-1 flex flex-col max-w-[450px]">
                        <div className="text-3xl pl-8 pb-2 uppercase text-sky-400 font-bold">Unlimited Exploration</div>
                        <div className="text-lg pl-8">Discover a list of open worlds jointly constructed by the community: Playing various game modes such as racing/shooting/role-playing, hosting virtual events, showcasing NFT art galleries, and many more.</div>
                    </div>
                    <div className="order-2">
                        <Image src="/images/highlight-exploration.png" width={400} height={400} />
                    </div>
                </div>
                {/* <div className="h-16 bg-gradient-to-b from-blue-400/75 to-violet-500/75"/> */}
                {/* <div className="flex flex-row items-center justify-center bg-gradient-to-b from-violet-500/75 to-violet-400/75 "></div> */}
                <div className="flex flex-row items-center justify-center">
                    <div className="order-2 flex flex-col max-w-[450px]">
                        <div className="text-3xl pl-8 pb-2 uppercase text-sky-400 font-bold" >Unlimited Creation</div>
                        <div className="text-lg pl-8 order-1" >Design your own avatar/race/gameplay/game mode/events with our Unreal Engine SDK or simply put together quests or levels using our in-game editor.</div>
                    </div>
                    <div className="order-1">
                        <Image src="/images/highlight-creation.png" width={400} height={400} />
                    </div>
                </div>
                {/* <div className="h-16 bg-gradient-to-b from-violet-400/75 to-blue-500/75"/> */}
                <div className="flex flex-row items-center justify-center">
                    <div className="order-1 flex flex-col max-w-[450px]">
                        <div className="text-3xl pl-8 pb-2 uppercase text-sky-400 font-bold" >Unlimited Earning</div>
                        <div className="text-lg pl-8">Earn by creating contents, tackling in-game quests events, serving certain social roles as well as contributing to the decentralised infrastructure.</div>
                    </div>
                    <div className="order-2">
                        <Image src="/images/highlight-earning.png" width={400} height={400} />
                    </div>
                </div>
            </div>

        </section>
    );
}

export default HighlightFeatureSection;