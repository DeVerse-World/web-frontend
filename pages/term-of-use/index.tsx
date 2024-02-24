import FirebaseService from "../../data/services/FirebaseService";

export async function getStaticProps() {
    const tou = await FirebaseService.getTermOfUse()
    return {
        props: {
            tou,
        },
    }
}

function TermOfUse({ tou }) {
    return (
        <div className="flex flex-col justify-center items-center p-4 mt-20" style={{ minHeight: '100vh' }} >
            <h1 className="text-center text-6xl deverse-header mb-4 font-bold">Terms of Use</h1>
            {tou && (
                <div className="w-full max-w-7xl px-10 my-0">
                    <div dangerouslySetInnerHTML={{ __html: tou }} className="privacy-policy-content" />
                </div>
            )}
        </div>

    )
}

export default TermOfUse;