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
        <div className="flex justify-center items-center p-4" >
            {policy && <div dangerouslySetInnerHTML={{ __html: policy }} />}
        </div>

    )
}

export default PrivacyPolicy;