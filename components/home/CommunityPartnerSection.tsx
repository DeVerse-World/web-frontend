import React, { useEffect, useState } from "react";
import { Partner } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";

function CommunityPartnerSection(props) {
    const [partners, setPartners] = useState<Partner[]>([])
    useEffect(() => {
        FirebaseService.getComunityPartners().then(setPartners)
    }, [])

    return (
        <section id="section-partner" className="p-4 ">
            <h3 className="text-center text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Community Partners</h3>
            <div className="flex flex-row flex-wrap gap-8 justify-center">
                {partners.map(partner =>
                    <a href={partner.uri} target="_blank" key={partner.id} className="w-[300px] mx-4 my-4 flex justify-center items-center">
                        <img className="max-w-[240px] max-h-[80px] w-auto h-auto" src={partner.thumbnail} />
                    </a>)}
            </div>
        </section>
    );
}

export default CommunityPartnerSection;