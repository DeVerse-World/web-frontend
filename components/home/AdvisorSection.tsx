import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { TeamAdvisor } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";
import styles from "../../styles/card-item.module.css";

type CardProps = {
    data: TeamAdvisor
}

function AdvisorCard(props: CardProps) {
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
                <h3 className=" font-bold ">{props.data.name}</h3>
                {props.data.experiences.map(experience =>
                    <span className="text-blue-200 text-start">{experience}</span>
                )}
            </div>
        </div>

        // <div  className="flex flex-row flex-wrap items-center gap-4 text-white border-white border-b-2 py-2">
        //     <span className="text-3xl font-bold text-blue-400 md:w-[300px] w-[200px] flex flex-row gap-2 items-center">
        //         <span style={{
        //             whiteSpace: "nowrap",
        //             overflow: "hidden",
        //             textOverflow: "ellipsis"
        //         }}>{props.data.name.toUpperCase()}</span>
        //         <a href={props.data.linkedin} target="_blank" className="cursor-pointer">
        //             <FaLinkedin  />
        //         </a>
        //     </span>
        //     <div className="flex flex-col max-h-[80px] md:w-[400px] w-[300px]" >
        //         {props.data.experiences.map((item,index) =>
        //             <div key={index}>
        //                 + {item}
        //             </div>
        //         )}
        //     </div>
        // </div>
    )
}

function AdvisorSection() {
    const [data, setData] = useState<TeamAdvisor[]>([])
    useEffect(() => {
        FirebaseService.getAdvisors().then(setData)
    }, [])

    return (
        <section id="section-advisor" className="p-4 flex flex-col items-center">
            <h3 className="text-center text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title py-4">Angels/ Advisors</h3>
            <div className="flex flex-row flex-wrap gap-8 justify-center">
                {data.map(item => <AdvisorCard data={item} key={item.id} />)}
            </div>
        </section>
    );
}

export default AdvisorSection;
