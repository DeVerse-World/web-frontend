import FirebaseService from "../../data/services/FirebaseService";
import LayoutWrapper from "../../components/LayoutWrapper";

export async function getStaticProps() {
    const policy = await FirebaseService.getCurrentPrivacyPolicy()
    return {
        props: {
            policy,
        },
    }
}

function PrivacyPolicy({ policy }) {
    return (
        <LayoutWrapper>
            <div id="section-content" className="flex justify-center items-center text-white p-4" >
                {policy && <div dangerouslySetInnerHTML={{ __html: policy }} />}
            </div>
        </LayoutWrapper>

    )
}

export default PrivacyPolicy;