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
        <div className="flex flex-col justify-center items-center p-4 mt-20" style={{ minHeight: '100vh' }} >
            <h1 className="text-center text-6xl deverse-header mb-4 font-bold">Privacy Policy</h1>
            {policy && (
                <div className="w-full max-w-7xl px-10 my-0">
                    <div dangerouslySetInnerHTML={{ __html: policy }} className="privacy-policy-content" />
                </div>
            )}
        </div>

    )
}

export default PrivacyPolicy;