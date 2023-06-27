import ContentAbout from "../../components/about/ContentAbout";
import AdvisorSection from "../../components/home/AdvisorSection";
import TeamMemberSection from "../../components/home/TeamMemberSection";

export default function About() {
    return (
        <div className='flex flex-col items'>
            <ContentAbout/>
            <TeamMemberSection />
            <AdvisorSection />
        </div>
    );
}