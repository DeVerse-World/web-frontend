import { CSSProperties, useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/contexts/app_context";

type Props = {
    style: CSSProperties
}

function AvatarContainer(props: Props) {
    const { user } = useContext(AppContext);
    const [avatar, setAvatar] = useState(user?.avatar || null);

    useEffect(() => {
        setAvatar(user?.avatar || "/images/placeholder.png");
    }, [user])

    return (
        <img title="avatar-image"
            src={avatar}
            width={160}
            height={160}
            style={props.style} />
    )
}

export default AvatarContainer;