import React, { useEffect, useState } from "react";
import { Partner } from "../../data/model/partner";
import FirebaseService from "../../data/services/FirebaseService";

function PartnerSection(props) {
    const [partners, setPartners] = useState<Partner[]>([])

    useEffect(() => {
        FirebaseService.getPartners().then(setPartners)
    }, [])

    return (
        <section id="section-partner" className="p-4 ">
            <h3 className="text-center text-white text-6xl font-bold uppercase mb-12 mx-4 deverse-title">Partners</h3>
            <div className="flex flex-row flex-wrap gap-8 justify-center">
                {partners.map(partner =>
                    <div className="w-[300px] mx-4 my-4 flex justify-center items-center">
                        <img className="max-w-[300px] max-h-[100px] w-auto h-auto" src={partner.thumbnail} />
                    </div>)}
            </div>

        </section>
    );
}

export default PartnerSection;
