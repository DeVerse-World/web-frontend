import { getAlphaLayout } from "./AlphaLayout";


function Info() {
    return (
        <div className="flex justify-center items-center text-white p-4" >
            <h1 >Coming soon</h1>
        </div>
    )
}

Info.getLayout = getAlphaLayout

export default Info;