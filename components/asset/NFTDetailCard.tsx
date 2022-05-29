import { Button, Modal, ModalProps } from "react-bootstrap";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset"

interface NFTDetailCardProps extends ModalProps {
    data?: NFTAsset;
}

export default function NFTDetailCard(props: NFTDetailCardProps) {

    const get2dImage = (nft: NFTAsset) => {
        if (nft == null) {
            return null;
        }
        if (nft.assetType == AssetType.IMAGE_2D) {
            return nft.fileAssetUri
        }
        return nft.file2dUri;
    }

    return (
        <Modal centered {...props} contentClassName="deverse-gradient text-white" dialogClassName="deverse-dialog">
            {/* <Modal.Header >
                <Modal.Title>{props.data?.name}</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="text-lg break-words flex flex-col">
                <h3>{props.data?.name}</h3><br />
                <span>{props.data?.description}</span>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button style={{
                    background: "linear-gradient(to bottom, rgb(65, 117, 230), rgb(18, 54, 173))",
                    width: 80
                }} onClick={() => {
                    props.onNftCreated(assetOnlinePath);
                    resetForm();
                }} >
                    Ok
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}

