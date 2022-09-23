import Image from "next/image";
import React, {useContext, useState} from "react";
import { AppContext } from "./contexts/app_context";
import { AccountTab } from "../data/enum/PageTabs";
import AvatarContainer from "./AvatarContainer";
import LoginModal from "./login/LoginModal";

type Props = {
    onSwitchTab: (AccountTab) => void
}

function ProfileTab(props: Props) {
    const { user } = useContext(AppContext);
    const [showAddMetamask, setShowAddMetamask] = useState(false);
    const [showAddGoogle, setShowAddGoogle] = useState(false);
    return (
        <div className="flex flex-col items-center text-white">
            <section id='cover-picture' className="h-[300px] overflow-hidden flex items-center">
                <img title="cover-image" src="images/01.png" />
            </section>
            <section id="avatar-section" className="flex flex-row w-[80%]">
                <div className="flex flex-row gap-4">
                    <AvatarContainer style={{
                        position: 'relative',
                        borderRadius: '50%',
                        borderWidth: '7px',
                        borderColor: 'red',
                        bottom: '50%'
                    }} />
                    <div>
                        <h1>Name: {user?.name}</h1>
                        <h5 className="text-deverse">Google Mail: {user?.social_email}</h5>
                        {user?.social_email == "" ? <button onClick={() => setShowAddGoogle(true)}>Link Google Mail</button> : ""}
                        {showAddGoogle && <LoginModal show={true} onHide={() => setShowAddGoogle(false)} isAddMetamaskOnly={false} isAddGoogleOnly={true} fullscreen />}
                        <h5 className="text-deverse">Wallet Address: {user?.wallet_address}</h5>
                        {user?.wallet_address == "" ? <button onClick={() => setShowAddMetamask(true)}>Link Metamask</button> : ""}
                        {showAddMetamask && <LoginModal show={true} onHide={() => setShowAddMetamask(false)} isAddMetamaskOnly={true} isAddGoogleOnly={false} fullscreen />}
                    </div>
                </div>
            </section>
            <section id="wallet-section" className="w-[80%]">
                <header>
                    <h3>Your Collection</h3>
                </header>
                <div className="flex flex-row gap-2 justify-between py-4">
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer" onClick={() => props.onSwitchTab(AccountTab.Avatar)}>Avatar</div>
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer" onClick={() => props.onSwitchTab(AccountTab.Inventory)}>2D Images</div>
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer" onClick={() => props.onSwitchTab(AccountTab.Inventory)}>Inventory</div>
                    {/* <div className="bg-dv w-[150px] h-[230px] cursor-pointer">Avatar</div> */}
                </div>
            </section>
        </div>
    )
}

export default ProfileTab;