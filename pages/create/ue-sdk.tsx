import LayoutWrapper from "../../components/LayoutWrapper";
import { TabHeaderBar } from "../../components/common/TabHeader";

export default function UESdk() {
    return (
        <LayoutWrapper>
            <TabHeaderBar data={[
                { href: '/create', label: 'Avatar' },
                // { href: '/create/mint', label: 'Mint' },
                { href: '/create/ig-editor', label: 'Ingame Editor' },
                { href: '/create/ue-sdk', label: 'Unreal Engine SDK' }
            ]} />
            <div id="section-content" className="flex flex-col gap-4 items-center text-white p-4" >
                <h1 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Build your own metaverse</h1>
                <h3 className="text-center px-16 max-w-[800px]">Leveraging our modular system and Unreal Engine SDK, you can create something truly amazing and even more fun</h3>
                <button className="bg-deverse-gradient px-4 py-2 rounded-xl">
                    Coming soon
                </button>
            </div>
        </LayoutWrapper>

    )
}