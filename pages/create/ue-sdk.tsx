import { getCreateLayout } from "../../components/CreateLayout";


function UESdk() {
    return (
        <div className="flex flex-col gap-4 items-center text-white p-4" >
            <h1 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Build your own metaverse</h1>
            <h3 className="text-center px-16 max-w-[800px]">Leveraging our modular system and Unreal Engine SDK, you can create something truly amazing and even more fun</h3>
            <button className="bg-deverse-gradient px-4 py-2 rounded-xl">
                Coming soon
            </button>
        </div>
    )
}

UESdk.getLayout = getCreateLayout

export default UESdk;