import { useContext } from "react";
import Footer from "../../components/common/Footer";
import { AppContext } from "../../components/contexts/app_context";
import FirebaseService from "../../data/services/FirebaseService";

function DocsScreen() {
    const { remoteConfig } = useContext(AppContext)
    
    return (
        <section id="section-content" className='flex flex-col gap-4 text-white'>
            <div className="flex-grow flex flex-row justify-center gap-4 flex-wrap p-4">
                <div onClick={() => {
                    FirebaseService.getPitchDeckUri(remoteConfig).then(url => {
                        window.open(url, "_blank")
                    }).catch(e => {
                        console.log(e)
                    })
                }} className="flex flex-col gap-4 p-4 cursor-pointer bg-emerald-700 rounded-lg w-[300px] h-[250px] text-white ">
                    <span className="section-header-lg">Pitch Deck</span>
                    <span>Overview of your vision and mission</span>
                    <span>View more</span>
                </div>
                <div onClick={() => {
                    window.open("https://docs.deverse.world", "_blank")
                }} className="flex flex-col gap-4 p-4 cursor-pointer bg-violet-700 rounded-lg w-[300px] h-[250px] text-white ">
                    <span className="section-header-lg">Documentation</span>
                    <span>Deverse World official documentation and resources</span>
                    <span>View more</span>
                </div>
            </div>
            <Footer />
        </section>
    )

}

export default DocsScreen;