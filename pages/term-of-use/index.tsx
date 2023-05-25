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
        <div id="section-content" className="flex justify-center items-center text-white p-4 h-full" >
            {tou && <div dangerouslySetInnerHTML={{ __html: tou }} />}
        </div>
    )
}

export default TermOfUse;