import React, { useEffect } from "react";
import { Image } from "react-bootstrap";

function HighlightFeatureSection() {

    return (
        <section id="section-highlight" className="md:px-2 px-4 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-center py-4 gap-4 flex-wrap">
                <div className="xl:order-1 flex flex-col md:w-[450px] ">
                    <div className="text-3xl uppercase text-sky-400 font-bold">Unlimited Exploration</div>
                    <div className="text-lg mt-2">Discover never-ending experiences jointly constructed by the community. You can join music clubs, participate in virtual concerts, play shooting games, become a leader of a country, showcase your digital arts, and many such more.</div>
                </div>
                <Image className="rounded-lg xl:order-2"
                    src="/images/highlight-exploration.gif" width={undefined} height={undefined} />
            </div>
            <div className="flex flex-row items-center justify-center py-4 gap-4 flex-wrap">
                <div className="xl:order-2 flex flex-col md:w-[450px]">
                    <div className="text-3xl uppercase text-sky-400 font-bold" >BECOME PIONEER IN METAVERSE</div>
                    <div className="text-lg order-1 mt-2" >Easily contribute and build the interconnected metaverse without programming knowledge using our drag-n-drop Editor, or enhance even beyond with our Unreal Engine SDK.</div>
                </div>
                <Image className="rounded-lg xl:order-1"
                    src="/images/highlight-pioneer.gif" width={undefined} height={undefined} />
            </div>
            <div className="flex flex-row items-center justify-center py-4 gap-4 flex-wrap">
                <div className="xl:order-1 flex flex-col md:w-[450px]">
                    <div className="text-3xl uppercase text-sky-400 font-bold" >TURN YOUR WORK INTO MONEY</div>
                    <div className="text-lg mt-2">Earn by selling your digital contents, tackling quest events, serving certain social roles and contributing to the metaverse.</div>
                </div>
                <Image className="rounded-lg xl:order-2"
                    src="/images/highlight-money.gif" width={undefined} height={undefined} />
            </div>
        </section>
    );
}

export default HighlightFeatureSection;