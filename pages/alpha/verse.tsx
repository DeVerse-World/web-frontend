import { getAlphaLayout } from "./AlphaLayout";


function Verse() {
    return (
        <div className="flex justify-center items-center text-white p-4" >
            <h1 >Coming soon</h1>
        </div>
    )
}

Verse.getLayout = getAlphaLayout

export default Verse;