import { Image } from "react-bootstrap";

function HighlightFeatureSection(props) {
    return (
        <section className="text-white bg-gray-800">
            <div className="col-lg-8 mx-auto text-center text-6xl font-bold py-8 uppercase max-w-[700px]">
                What can you do in Deverse?
            </div>
            <div className="flex flex-row items-center justify-center bg-cyan-800 bg-cover bg-center">
                <div className="order-1 flex flex-col max-w-[400px]">
                    <div className="text-[30px] md:text-[40px]" style={{ textShadow: "-3px 0px #21EFE8,3px 0px #EB3BEC" }}>Unlimited Exploration</div>
                    <div className="">Discover a list of open worlds jointly constructed by the community: Playing battle royale games, hosting virtual events, showcasing NFT art galleries, etc</div>
                </div>
                <div className="order-2 py-4">
                    <Image src="/images/highlight-exploration.png" width={400} height={400} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center bg-violet-800 bg-cover bg-center">
                <div className="order-2 flex flex-col max-w-[400px]">
                    <div className="text-[30px] md:text-[40px]" style={{ textShadow: "-3px 0px #21EFE8,3px 0px #EB3BEC" }}>Unlimited Creation</div>
                    <div className="order-1">Use our in-game editor to customise items and design worlds/ events for casual users, as well as editor/ SDK for advanced developers</div>
                </div>
                <div className="order-1 py-4">
                    <Image src="/images/highlight-creation.png" width={500} height={500} />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center bg-blue-800 bg-cover bg-center">
                <div className="order-1 flex flex-col max-w-[400px]">
                    <div className="text-[30px] md:text-[40px]" style={{ textShadow: "-3px 0px #21EFE8,3px 0px #EB3BEC" }}>Unlimited Earning</div>
                    <div className="">Earn by creating assets, tackling in-game quests events, serving certain social roles as well as contributing to the decentralised infrastructure</div>
                </div>
                <div className="order-2 py-4">
                    <Image src="/images/highlight-earning.png" width={400} height={400} />
                </div>
            </div>
        </section>
    );
}

export default HighlightFeatureSection;