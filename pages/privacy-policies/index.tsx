import { useEffect, useState } from "react";
import { getLayoutWithFooter } from "../../components/LayoutWithFooter";
import FirebaseService from "../../data/services/FirebaseService";


function PrivacyPolicy() {
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        FirebaseService.getCurrentPrivacyPolicy().then(res => {
            setPolicy(res)
        })
    }, [])

    return (
        <div className="flex justify-center items-center text-white p-4" >
            {policy && <div dangerouslySetInnerHTML={{ __html: policy }} />}

        </div>
    )
}

PrivacyPolicy.getLayout = getLayoutWithFooter;

export default PrivacyPolicy;