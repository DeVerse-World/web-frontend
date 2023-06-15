import { useEffect, useState } from "react"
import { FaLinkedin } from "react-icons/fa";
import { TeamMember } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";
import styles from "../../styles/card-item.module.css";
import PersonCard from "../about/PersonCard";

type CardProps = {
    data: TeamMember
}


function TeamMemberCard(props: CardProps) {
    return (
        <div className={`w-[250px] text-white ${styles.nftCard}`}>
            <div className="relative rounded-lg w-[250px] h-[250px]">
                <img className="w-full h-full absolute" title={props.data.name} alt={props.data.name} src={props.data.thumbnail} />
                <div className="flex flex-row items-center gap-2 absolute bottom-1 left-1">
                    <span className="bg-blue-600 px-2 rounded-lg text-sm font-b">{props.data.title}</span>
                    <a href={props.data.linkedin} target="_blank" className="bg-white">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
            <div className="py-2 flex flex-col items-start px-2">
                <h3 className="font-bold ">{props.data.name}</h3>
                <span className="text-blue-200 text-start">{props.data.education.split('\\n').map((item, index) =>
                    (index === 0) ? item : [<br key={index} />, item]
                )}</span>
            </div>
        </div>
    )
}


function TeamMemberSection(props) {
    const [team, setTeam] = useState<TeamMember[]>([])
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    
    useEffect(() => {
        FirebaseService.getTeamMembers().then(setTeam);
    }, [])

    return (
        <div>
            <div className="mx-auto mt-24 max-w-5xl px-6 sm:mt-28 lg:px-8">
                <div className="max-w-2xl lg:mx-0">     
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl ">Founding team</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-300">
                        Excepturi repudiandae alias ut. Totam aut facilis. Praesentium in neque vel omnis. Eos error odio. Qui
                        fugit voluptatibus eum culpa.
                    </p>
                </div>
                <div
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-9 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {team.map((person) => (
                        <PersonCard
                            key={person.name}
                            name={person.name}
                            title={person.title}
                            thumbnail={person.thumbnail}
                            education={person.education}
                            linkedinLink={person.linkedin}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    );

    return (
        <section id="team-member" className="p-4 text-center flex flex-col items-center">
            <h3 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title py-4">Founding Team</h3>
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