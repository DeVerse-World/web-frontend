import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import AvatarService from "../../data/services/AvatarService";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import NFTDetailCard from "./NFTDetailCard";

type Props = {
    key: number,
    data: NFTAsset,
    onDeleted: (NFTAsset) => void
}

function NFTCard(props: Props) {
    const [showDetail, setShowDetail] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const get2dImage = (nft: NFTAsset) => {
        if (nft.assetType == AssetType.IMAGE_2D) {
            return nft.fileAssetUri
        }
        return nft.file2dUri;
    }

    const onDeleteAsset = () => {
        switch (props.data.assetType) {
            case AssetType.AVATAR:
                AvatarService.deleteAvatar(props.data.id).then(res => {
                    console.log(res.data)
                    console.log(res.error);
                    props.onDeleted(props.data)
                }).finally(() => {
                    setIsDeleting(false);
                })
                break;
            case AssetType.ROOT_SUBWORLD_TEMPLATE:
                SubWorldTemplateService.deleteRootTemplate(props.data.id).then(res => {
                    console.log(res)
                    props.onDeleted(props.data)
                }).finally(() => {
                    setIsDeleting(false);
                })
                break;
            case AssetType.DERIV_SUBWORLD_TEMPLATE:
                SubWorldTemplateService.deleteDerivTemplate(props.data.rootId, props.data.id).then(res => {
                    console.log(res)
                    props.onDeleted(props.data)
                }).finally(() => {
                    setIsDeleting(false);
                })
                break;
            default:
                break;
        }
    }

    const renderPreview = () => {
        if (!props.data.file3dUri) {
            return null;
        }

        let previewLink = `/asset-preview?model=${props.data.file3dUri.substring(props.data.file3dUri.lastIndexOf('/') + 1)}`;
        if (props.data.assetType == AssetType.AVATAR) {
            previewLink = `/asset-preview?avatarId=${props.data.id}`;
        }
        return (
            <a className="no-underline font-bold" style={{
                color: "rgb(97 198 208)"
            }} href={previewLink} target="_blank">Preview</a>
        )
    }

    const renderDelete = () => {
        if (!props.data.deletable) {
            return null;
        }
        return (
            <BsFillTrashFill size={30} cursor='pointer' onClick={() => {
                setIsDeleting(true);
            }} />
        )
    }

    return (
        <div className="deverse-border w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white m-2">
            <div className="flex justify-center h-[225px] p-4 ">
                <img src={get2dImage(props.data) || "/images/placeholder.png"} />
            </div>
            <p className="px-4 text-2xl font-semibold" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>{props.data.name}</p>
            <div className="flex flex-row px-4">
                <div>
                    <h5 style={{
                        cursor: "pointer",
                        color: "rgb(97 198 208)",
                        fontWeight: 800
                    }} onClick={() => setShowDetail(true)}>Show Detail</h5>
                    <p>{props.data.assetType}</p>
                    {renderPreview()}
                    {props.data.supply > 0 && <h5>Supply: {props.data.supply}</h5>}
                </div>
                <div className="grow flex flex-col items-center gap-4">
                    <a title={props.data.name} href={props.data.fileAssetUri} target="_blank">
                        <img title={"Download"} src={"/images/ic-download.png"} width={32} height={32} />
                    </a>
                    {renderDelete()}
                </div>
            </div>
            {showDetail && <NFTDetailCard data={props.data} show={true} onHide={() => setShowDetail(false)} />}
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
                </Modal>}
        </div>
    )
}

export default NFTCard;