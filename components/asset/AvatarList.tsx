import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
import { useState } from "react";
import NFTCard from "./NFTCard";
const itemPerPage = 5;

type AvatarListProps = {
    data: AvatarViewModel[];
    onDeleted?: (AvatarViewModel) => void
}

export default function AvatarList(props: AvatarListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className="flex flex-row flex-wrap justify-center">
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item: AvatarViewModel, index: number) =>
                        <AvatarCard key={index} data={item} />
                    )
                }
            </div>
            <div className="flex flex-row gap-2">
                <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
            </div>
        </section>
    )
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
    name?: string;
    description?: string;
    image?: string;
    modelUri?: string;
    
    deletable?: boolean;
}

export function AvatarCard(props: AvatarCardProps) {
    return (
        <div className="nft-card w-[250px] h-[450px]  m-2">
            <div className="flex justify-center h-[225px] p-4 ">
                <img src={props.data.image || "/images/placeholder.png"} />
            </div>
            <p className="px-4 text-2xl font-semibold" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>{props.data.name}</p>
            <div className="flex flex-row px-4">
                <div>
                    <a className="no-underline font-bold" style={{
                        color: "rgb(97 198 208)"
                    }} href={`/asset-preview?avatarId=${props.data.id}`} target="_blank">Preview</a>
                    {props.data.supply > 0 && <h5>Supply: {props.data.supply}</h5>}
                </div>
                <div className="grow flex flex-col items-center gap-4">
                    {/* {props.data.fileAssetUri &&
                        <a title={props.data.name} href={props.data.fileAssetUri} target="_blank">
                            <img title={"Download"} src={"/images/ic-download.png"} width={32} height={32} />
                        </a>
                    } */}
                    {/* {renderDelete()}
                    {renderOnlineOpen()}
                    {renderOfflineOpen()} */}
                </div>
            </div>
            {/* {showDetail && <NFTDetailCard data={props.data} show={true} onHide={() => setShowDetail(false)} />}
            {isDeleting &&
                <Modal centered show={true}
                    onHide={() => {
                        setIsDeleting(false);
                    }}
                    contentClassName="bg-deverse-gradient" dialogClassName="deverse-dialog">
                    <Modal.Body className="text-white text-lg break-words">
                        U sure want to delete this avatar?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{
                            background: "linear-gradient(to bottom, #ff715b, #d6290f)",
                            width: 80
                        }} onClick={() => {
                            setIsDeleting(false);
                        }}>
                            Cancel
                        </Button>
                        <Button style={{
                            background: "linear-gradient(to bottom, rgb(65, 117, 230), rgb(18, 54, 173))",
                            width: 80
                        }} onClick={onDeleteAsset} >
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>} */}
        </div>
    )
}