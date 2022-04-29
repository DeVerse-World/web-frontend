import React, { useState } from "react";
import { Image, Modal } from "react-bootstrap";
import { FeatureStatus } from "../../data/enum/feature_status";


function ProductSection(props) {
    const renderProductList = () => {
        const items: ProductionSectionData[] = [
            {
                icon: "product-ad",
                name: "ads",
                status: FeatureStatus.PENDING,
                description: "An advertisement platform with ads placement in different subworld settings. Use a dynamic mechanism to determine ads pricing based on traffic and popularity, similar to ads system in existing social media platforms."
            },
            {
                icon: "product-dao",
                name: "dao",
                status: FeatureStatus.IN_PROGRESS,
                description: "Using the fungible tokens, users can stake in the protocol & vote on important system decisions, dev grants, etc."
            },
            {
                icon: "product-decentralised-graphic-sharing",
                name: "UE5 + Graphic Sharing",
                status: FeatureStatus.PENDING,
                description: "We are using Unreal Engine 5 to leverage newest technology to provide a super realistic graphics. However, it requires strong GPU power on the user's side, which can be a highly costly up-front purchase. With UE Pixel Streaming technology, we enable a decentralized marketplace where user owning strong GPU can share this computing resource with others, earning a token in return."
            },
            {
                icon: "product-decentralised-subworld-hosting",
                name: "Dec subworld hosting",
                status: FeatureStatus.IN_PROGRESS,
                description: "Provide a desktop management app and a discovery service for anyone to host a sub-world instance. This can lead to theoretically-infinite scale of the server power, as well as true decentralized computing layer of the metaverse."
            },
            {
                icon: "product-integrity-validation",
                name: "integrity validation",
                status: FeatureStatus.PENDING,
                description: "We validate the integrity of a new asset through two mechanisms. Firstly, we capture a bunch of transformation sequences audited in our SDK/ Editor pipeline before the asset is minted. With proper visualization of the sequence and a good AI model for outputting the \"innovative\" score of the asset, end-user can determine the actual innovation score of the NFT before deciding to purchase. Secondly, we maintain a Prediction Market mechanism, where moderators will score a minted asset and later double checked by another moderator. There will be token incentive/ penalty depending on the consensus of the scores between different moderators."
            },
            {
                icon: "product-quest-creator-tool",
                name: "quest creator tool",
                status: FeatureStatus.PLANNING,
                description: "Let user design in-game quests with various existing templates. At the start we will bootstrap certain quest templates, while delegating this ability back to the community in longer-term."
            },
            {
                icon: "product-sdk",
                name: "sdk",
                status: FeatureStatus.IN_PROGRESS,
                description: "Let user design & introduce new characters/ skins/ gameplays/ races/ subworlds/ etc, by leveraging the plugginable item architecture feature of Unreal Engine 5. We build a custom UE Editor for maximum integration/ interaction with blockchain, and a runtime plugin to mount NFT assets in game."
            },
            {
                icon: "product-smart-nft",
                name: "smart NFT",
                status: FeatureStatus.IN_PROGRESS,
                description: " Support both non-fungible & semi-fungible tokens, enabling renting and hierarchical fee sharing structure of NFTs. Besides, we introduce a new concept called liquidity-backed insurance, where fees at each transfer are accumulated to provide a guaranteed buy-back scheme with minimum price for the asset, which in turns improve the asset liquidity."
            },
        ];
        return (
            items.map((item, index, arr) => {
                return ProductSectionItem(item);
            })
        )
    }

    return (
        <section className="bg-gray-800 p-4 text-white text-center">
            <div className="text-6xl font-bold uppercase">
                Our products
            </div>
            <div className="flex flex-row flex-wrap justify-center">
                {renderProductList()}
            </div>
        </section>

    );
}

export default ProductSection;


type ProductionSectionData = {
    icon: any;
    name: string;
    description: string;
    status: FeatureStatus;
}


function ProductSectionItem(props: ProductionSectionData) {
    const [showDescription, setShowDescription] = useState(false);

    const onShowDescription = (e) => {
        setShowDescription(true);
    }

    const getStatusColor = (status: FeatureStatus): React.CSSProperties => {
        let statusColorStyle: React.CSSProperties = {};
        switch (status) {
            case FeatureStatus.IN_PROGRESS:
                statusColorStyle.color = 'green'
                break;
            case FeatureStatus.PENDING:
                statusColorStyle.color = 'red'
                break;
            default:
                statusColorStyle.color = 'yellow'
                break;
        }
        return statusColorStyle;
    }

    return (
        <div key={props.name} className="p-4 max-w-[350px] relative cursor-default">
            <Image
                className="m-auto"
                src={`/images/${props.icon}.png`}
                width={300} height={300}
            />
            <div className="rounded-md bg-gradient-to-r from-blue-700 to-violet-500 
                uppercase cursor-pointer h-16
                flex flex-col justify-center"
                onClick={onShowDescription}>
                <span className="text-lg">{props.name}</span>
            </div>

            <h6 className="uppercase mt-4" style={getStatusColor(props.status)}>{props.status}</h6>
            <Modal centered show={showDescription} onHide={() => setShowDescription(false)}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="bg-gradient-to-b from-red-400 to-red-700 text-white">
                    <span>{props.description}</span>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>

        </div>
    )
}