import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { TeamAdvisor } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";

type CardProps = {
    data: TeamAdvisor
}

function AdvisorCard(props: CardProps) {
    return (
        <div className="advisor-card  gap-4 text-white">
            <span className="text-3xl text-blue-400">{props.data.name.toUpperCase()}</span>
            <div className="flex flex-col h-[80px]">
                {props.data.experiences.map(item =>
                    <div>
                        + {item}
                    </div>
                )}
            </div>
            <div className="relative rounded-lg w-[250px] h-[250px]">
                <img className="w-full h-full absolute " src={props.data.thumbnail} />
                <div className="flex flex-row items-center gap-2 absolute bottom-1 left-1">
                    <a href={props.data.linkedin} target="_blank" className="bg-white">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </div>
    )
}

function AdvisorSection() {
    const [data, setData] = useState<TeamAdvisor[]>([])
    useEffect(() => {
        FirebaseService.getAdvisors().then(setData)
    }, [])

    return (
        <section id="section-partner" className="p-4">
            <h3 className="text-center text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title py-4">Advisors</h3>
            <div className="flex flex-row gap-4 flex-wrap justify-center">
                {data.map(item => <AdvisorCard data={item} key={item.id} />)}
            </div>
        </section>
    );
}

export default AdvisorSection;