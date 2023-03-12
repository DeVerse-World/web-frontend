import { CSSProperties, useContext, useEffect, useState } from "react";
import { AppContext } from "./contexts/app_context";

type Props = {
    style?: CSSProperties
}

function AvatarContainer(props: Props) {
    const { user } = useContext(AppContext);
    const [avatar, setAvatar] = useState("/images/placeholder.webp");

    useEffect(() => {
        if (user) {
            setAvatar(user.avatar || "/images/placeholder.webp");
        } else {
            setAvatar("/images/placeholder.webp");
        }
    }, [user])

    return (
        <img className="rounded-full border-4" title="avatar-image"
            src={avatar}
            width={160}
            height={160}
            style={props.style} />
    )
}

export default AvatarContainer;