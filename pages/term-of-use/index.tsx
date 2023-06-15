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
        <div className="flex justify-center items-center p-4">
            {tou && <div dangerouslySetInnerHTML={{ __html: tou }} />}
        </div>
    )
}

export default TermOfUse;