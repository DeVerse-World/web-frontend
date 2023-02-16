import FirebaseService from "../../data/services/FirebaseService";
import LayoutWrapper from "../../components/LayoutWrapper";

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
        <LayoutWrapper>
            <div id="section-content" className="flex justify-center items-center text-white p-4" >
                {tou && <div dangerouslySetInnerHTML={{ __html: tou }} />}
            </div>
        </LayoutWrapper>
    )
}

export default TermOfUse;