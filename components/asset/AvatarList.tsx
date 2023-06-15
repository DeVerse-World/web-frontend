
import Link from "next/link";
import AvatarService from "../../data/services/AvatarService";
import styles from "../../styles/card-item.module.css";
import InifiniteList from "../marketplace/InfiniteList";

const itemPerPage = 4;

type AvatarListProps = {
    data: AvatarViewModel[];
    cardType: string;
    onDeleted?: (AvatarViewModel) => void;
}

export default function AvatarList({ data, ...props }: AvatarListProps) {
    return (
        <InifiniteList items={data} {...props} />
    );
}

type AvatarCardProps = {
    key: number,
    data: AvatarViewModel,
    // onDeleted: (AvatarViewModel) => void
}
export type AvatarViewModel = {
    id?: string;
    tokenURI?: string;
    supply?: number;
    maxSupply?: number;
    name?: string;
    description?: string;
    image?: string;
    modelUri?: string;

    deletable?: boolean;
}

export function AvatarCard(props: AvatarCardProps) {
    const onDelete = () => {
        AvatarService.deleteAvatar(props.data.id).then(res => {
            // props.onDeleted(props.data)
        }).finally(() => {
            // setIsDeleting(false);
        })
    }

    const renderContent = () => {
        return (
            <div className={`${styles.nftCard} ${styles.nftCardHover} w-[250px] h-[310px] overflow-hidden flex flex-col`}>
                <div className="h-[250px] flex flex-col justify-center">
                    <img src={props.data.image || "/images/placeholder.webp"} />
                </div>
                <span className="text-2xl px-4 py-2 font-semibold text-blue-300" style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{props.data.name}</span>
            </div>
        )
    }

    if (!props.data.id) {
        return renderContent()
    }
    return (
        <Link href={`/asset-preview?avatarId=${props.data.id}`} className="no-underline" prefetch={false}>
            {renderContent()}
        </Link>
    )
}