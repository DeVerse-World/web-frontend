import LayoutWrapper from "../../components/LayoutWrapper";
import AdvisorSection from "../../components/home/AdvisorSection";
import TeamMemberSection from "../../components/home/TeamMemberSection";

export default function About() {
    return (
        <LayoutWrapper>
            <div id="section-content" className='flex flex-col items-center'>
                <div className="py-8 px-16 text-2xl md:max-w-[60vw] xl:max-w-[50vw] text-center">
                    {/* <h3 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title py-4 text-center">Our Mission</h3> */}
                    We are dedicated to bring the best out of content creators, digital artists, provide gamers with a vast and never-ending playground with high quality contents.
                    We truly believe that anyone should be able to design their worlds, tell compelling stories, or bring joy and laughter to friends and communities.
                    We know there are far more better creators than us, so we do our best to provide capabilities and necessary tools to everyone.
                    We are proud to be with you on that journey, together contributing to the decentralized metaverse.
                </div>
                <TeamMemberSection />
                <AdvisorSection />
            </div>
        </LayoutWrapper>
    );
}