import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useInView } from 'react-intersection-observer';

function HighlightFeatureSection(props) {

    const { ref, inView, entry } = useInView({
        triggerOnce: true
    });

    return (
        <section ref={ref} id="section-highlight" className="text-white px-4">
            {inView && <>
                <div className="flex flex-row items-center justify-center py-4 mx-auto w-fit">
                    <div className="order-1 flex flex-col max-w-[45vw] md:max-w-[450px]">
                        <div className="text-3xl uppercase text-sky-400 font-bold">Unlimited Exploration</div>
                        <div className="text-lg mt-2">Discover a list of open worlds jointly constructed by the community: Playing various game modes such as racing / shooting / role-playing, hosting virtual events, showcasing NFT art galleries, and many more.</div>
                    </div>
                    <div className="order-2">
                        <Image src="/images/highlight-exploration.webp" width={400} height={400} />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center py-4">
                    <div className="order-2 flex flex-col max-w-[45vw] md:max-w-[450px]">
                        <div className="text-3xl uppercase text-sky-400 font-bold" >Unlimited Creation</div>
                        <div className="text-lg order-1 mt-2" >Design your own avatar / race / gameplay / game mode / events with our Unreal Engine SDK or simply put together quests or levels using our in-game editor.</div>
                    </div>
                    <div className="order-1">
                        <Image src="/images/highlight-creation.webp" width={400} height={400} />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center py-4">
                    <div className="order-1 flex flex-col max-w-[45vw] md:max-w-[450px]">
                        <div className="text-3xl uppercase text-sky-400 font-bold" >Unlimited Earning</div>
                        <div className="text-lg mt-2">Earn by creating contents, tackling in-game quests events, serving certain social roles as well as contributing to the decentralised infrastructure.</div>
                    </div>
                    <div className="order-2">
                        <Image src="/images/highlight-earning.webp" width={400} height={400} />
                    </div>
                </div>
            </>}
        </section>
    );
}

export default HighlightFeatureSection;