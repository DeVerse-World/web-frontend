import { useEffect, useState } from "react";
import FirebaseService from "../../data/services/FirebaseService";
import LayoutWrapper from "../../components/LayoutWrapper";

function TermOfUse() {
    const [term, setTerm] = useState('');

    useEffect(() => {
        FirebaseService.getTermOfUse().then(res => {
            setTerm(res)
        })
    }, [])

    return (
        <LayoutWrapper>
            <div id="section-content" className="flex justify-center items-center text-white p-4" >
                {term && <div dangerouslySetInnerHTML={{ __html: term }} />}
            </div>
        </LayoutWrapper>
    )
}

export default TermOfUse;