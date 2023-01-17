import React, { useEffect, useState } from "react";
import { Partner } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";
import { useInView } from 'react-intersection-observer';

function PartnerSection(props) {
    const [partners, setPartners] = useState<Partner[]>([])
    useEffect(() => {
        FirebaseService.getPartners().then(setPartners)
    }, [])

    const { ref, inView, entry } = useInView({
        triggerOnce: true
    });

    return (
        <section ref={ref} id="section-partner" className="p-4 ">
            {inView && <>
                <h3 className="text-center text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Partners</h3>
                <div className="flex flex-row flex-wrap gap-8 justify-center">
                    {partners.map(partner =>
                        <a href={partner.uri} target="_blank" key={partner.id} className="w-[300px] mx-4 my-4 flex justify-center items-center">
                            <img className="max-w-[240px] max-h-[80px] w-auto h-auto" src={partner.thumbnail} />
                        </a>)}
                </div>
            </>}
        </section>
    );
}

export default PartnerSection;
