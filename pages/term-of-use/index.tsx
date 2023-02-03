import { useEffect, useState } from "react";
import { getLayoutWithFooter } from "../../components/LayoutWithFooter";
import FirebaseService from "../../data/services/FirebaseService";


function TermOfUse() {
    const [term, setTerm] = useState('');

    useEffect(() => {
        FirebaseService.getTermOfUse().then(res => {
            setTerm(res)
        })
    }, [])

    return (
        <div className="flex justify-center items-center text-white p-4" >
            {term && <div dangerouslySetInnerHTML={{ __html: term }} />}
        </div>
    )
}

TermOfUse.getLayout = getLayoutWithFooter;

export default TermOfUse;