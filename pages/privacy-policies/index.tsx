import FirebaseService from "../../data/services/FirebaseService";

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
        <div id="section-content" className="flex justify-center items-center text-white p-4 h-full" >
            {policy && <div dangerouslySetInnerHTML={{ __html: policy }} />}
        </div>

    )
}

export default PrivacyPolicy;