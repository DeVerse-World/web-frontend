import { useEffect } from "react";
import AvatarService from "../../data/services/AvatarService";
import { getCreateLayout } from "../../data/services/CreateLayout";


function Avatar() {

    const handleRPMEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me')) {
            return;
        }
        if (e.data.includes('.glb')) {
            AvatarService.createAvatar(e.data)
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleRPMEvent);
        return () => {
            window.removeEventListener('keydown', handleRPMEvent);
        }
    }, [])

    return (
        <iframe allow="camera *; microphone *"
            title="Ready Player Me"
            className='rpo'
            src='https://deverse.readyplayer.me/avatar?frameApi' />
    )
}

Avatar.getLayout = getCreateLayout

export default Avatar;