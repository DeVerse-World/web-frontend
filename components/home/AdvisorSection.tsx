import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { TeamAdvisor } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";
import styles from "../../styles/card-item.module.css";
import PersonCard from "../about/PersonCard";

type CardProps = {
    data: TeamAdvisor
}

function AdvisorSection() {
    const [data, setData] = useState<TeamAdvisor[]>([])
    useEffect(() => {
        FirebaseService.getAdvisors().then(setData)
    }, [])
    return (
        <div className="mx-auto my-24 max-w-5xl px-6 sm:mt-28 lg:px-8">
            <div className="max-w-2xl lg:mx-0">     
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl ">Angels and Advisors</h2>
            </div>
            <div
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-9 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
                {data.map((person) => (
                    <PersonCard
                        key={person.name}
                        name={person.name}
                        title={person.title}
                        thumbnail={person.thumbnail}
                        education={person.experiences}
                        linkedinLink={person.linkedin}

                    />
                ))}
            </div>
        </div>
    );
}

export default AdvisorSection;
