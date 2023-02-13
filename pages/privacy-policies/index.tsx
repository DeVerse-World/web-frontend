import { useEffect, useState } from "react";
import FirebaseService from "../../data/services/FirebaseService";
import LayoutWrapper from "../../components/LayoutWrapper";


function PrivacyPolicy() {
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        FirebaseService.getCurrentPrivacyPolicy().then(res => {
            setPolicy(res)
        })
    }, [])

    return (
        <LayoutWrapper>
            <div id="section-content" className="flex justify-center items-center text-white p-4" >
                {policy && <div dangerouslySetInnerHTML={{ __html: policy }} />}
            </div>
        </LayoutWrapper>

    )
}

export default PrivacyPolicy;