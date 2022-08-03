import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../components/contexts/app_context";
import AvatarContainer from "./AvatarContainer";

function ProfileTab(props) {
    const { user } = useContext(AppContext);
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
                        <h1>{user?.name}</h1>
                        <h5 className="text-deverse">{user?.email}</h5>
                    </div>
                </div>
            </section>
            <section id="wallet-section" className="w-[80%]">
                <header>
                    <h3>Your Collection</h3>
                </header>
                <div className="flex flex-row gap-2 justify-between py-4">
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer">2D Images</div>
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer">Avatar</div>
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer">Inventory</div>
                    <div className="bg-dv w-[150px] h-[230px] cursor-pointer">Avatar</div>
                </div>
            </section>
        </div>
    )
}

export default ProfileTab;