import { getCreateLayout } from "./CreateLayout";


function Avatar() {
    return (
        <iframe allow="camera *; microphone *"
            className='rpo'
            src='https://deverse.readyplayer.me/avatar?frameApi' />
    )
}

Avatar.getLayout = getCreateLayout

export default Avatar;