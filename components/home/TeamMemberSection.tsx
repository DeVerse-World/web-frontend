import { useEffect, useState } from "react"
import { FaLinkedin } from "react-icons/fa";
import { TeamMember } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";

type CardProps = {
    data: TeamMember
}

function TeamMemberCard(props: CardProps) {
    return (
        <div className="w-[250px] text-white">
            <div className="relative rounded-lg w-[250px] h-[250px]">
                <img className="w-full h-full absolute " src={props.data.thumbnail} />
                <div className="flex flex-row items-center gap-2 absolute bottom-1 left-1">
                    <span className="bg-blue-600 px-2 rounded-lg text-sm font-b">{props.data.title}</span>
                    <a href={props.data.linkedin} target="_blank" className="bg-white">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
            <div className="py-2 flex flex-col items-start">
                <h3 className="text-blue-400 font-bold ">{props.data.name}</h3>
                <span className="text-blue-200 text-start">{props.data.education.split('\\n').map((item, index) =>
                    (index === 0) ? item : [<br key={index} />, item]
                )}</span>
            </div>
        </div>
    )
}

function TeamMemberSection(props) {
    const [teamMember, setTeamMember] = useState<TeamMember[]>([])
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    useEffect(() => {
        FirebaseService.getTeamMembers().then(setTeamMember)
    }, [])




    return (
        <section id="team-member" className="p-4 text-center flex flex-col items-center">
            <h3 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title py-4">Our Team</h3>
            <div className="flex flex-row flex-wrap gap-8 justify-center ">

                {teamMember.length > 3 && isExpanded
                    ? teamMember.map(teamMember => <TeamMemberCard data={teamMember} />)
                    : teamMember.slice(0, teamMember.length > 3 ? 3 : teamMember.length).map(teamMember => <TeamMemberCard key={teamMember.id} data={teamMember} />)
                }
            </div>
            {
                teamMember.length > 3 && !isExpanded &&
                <span className="my-4 cursor-pointer text-blue-600" onClick={() => setIsExpanded(true)}>Show all members...</span>
            }
        </section>
    );
}

export default TeamMemberSection;