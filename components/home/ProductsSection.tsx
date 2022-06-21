import React, { useState } from "react";
import { Image, Modal, Tooltip } from "react-bootstrap";
import { FeatureStatus } from "../../data/enum/feature_status";


function ProductSection(props) {
    const renderProductList = () => {
        const items: ProductionSectionData[] = [
            {
                icon: "product-ad.png",
                name: "ads",
                status: FeatureStatus.PENDING,
                description: "Game as an advertisement platform, utilizing a similar ads system from exisiting social media platforms to determine pricing."
            },
            {
                icon: "product-dao.png",
                name: "dao",
                status: FeatureStatus.IN_PROGRESS,
                description: "Be part of the system & vote on important decisions, dev grants, etc."
            },
            {
                icon: "product-decentralised-graphic-sharing.png",
                name: "UE5 + Graphic Sharing",
                status: FeatureStatus.PENDING,
                description: "With Unreal Engine 5 and Pixel Streaming, we leverage the newest game technology to provide the best experience possible and enable a decentralized marketplace where powerful machine owners can share their computing resources in return for token rewards."
            },
            {
                icon: "product-decentralised-subworld-hosting.png",
                name: "Dec subworld hosting",
                status: FeatureStatus.IN_PROGRESS,
                description: "Users can manage and host their interconnected verses using our in-built custom management app, expanding infinitely the decentralized metaverse."
            },
            {
                icon: "product-integrity-validation.png",
                name: "integrity validation",
                status: FeatureStatus.PENDING,
                description: " Using editor action sequence recorder and AI, we can approximately calculate innovation score of the NFT. Along with a Prediction Market mechanism, we will provide the the best possible assessments of the NFT for end-users."
            },
            {
                icon: "product-quest-creator-tool.png",
                name: "quest creator tool",
                status: FeatureStatus.PLANNING,
                description: "A custom editor tool that let users design their campaigns/quests. Use various existing templates or build from scratch."
            },
            {
                icon: "product-sdk.png",
                name: "sdk",
                status: FeatureStatus.IN_PROGRESS,
                description: "Deverse SDK, powered by Unreal Engine 5, let users design & introduce skins/races/verses/gameplays/etc and mint them as NFT with ease."
            },
            {
                icon: "product-smart-nft.png",
                name: "smart NFT",
                status: FeatureStatus.IN_PROGRESS,
                description: "Support non-fungible & semi-fungible tokens, enabling renting and hierarchical fee sharing structure of NFTs. We also introduce liquidity-backed insurance, where transfer fees are accumulated to provide a guaranteed buy-back scheme at minimum price of an asset, which improves the asset liquidity."
            },
        ];
        return (
            items.map((item, index, arr) => {
                return ProductSectionItem(item);
            })
        )
    }

    return (
        <section className="p-4 text-white text-center ">
            <div className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">
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

    const getStatusIcon = (status: FeatureStatus): string => {
        switch (status) {
            case FeatureStatus.IN_PROGRESS:
                return "/images/ic-inprogress.png";
                break;
            case FeatureStatus.PENDING:
                return "/images/ic-pending.png";
                break;
            default:
                return "/images/ic-planning.png";
                break;
        }
    }

    return (
        <div key={props.name} className="p-4 max-w-[350px] relative cursor-default">
            <div style={{
                position: "relative"
            }}>
                <span style={{
                    position: "absolute",
                    top: 0,
                    left: 0
                }}>
                    <Tooltip title={props.status} style={{ position: "absolute", width: 36, height: 36 }}></Tooltip>
                    <Image src={getStatusIcon(props.status)}
                        width={44} height={44} />
                </span>
                <Image
                    className="m-auto"
                    src={`/images/${props.icon}`}
                    width={300} height={300}
                />
            </div>
            <div className="rounded-md bg-deverse-gradient
                uppercase cursor-pointer h-16
                flex flex-col justify-center"
                onClick={onShowDescription}>
                <span className="text-lg font-black" >{props.name}</span>
            </div>


            <Modal centered show={showDescription} onHide={() => setShowDescription(false)} dialogClassName="deverse-dialog">
                {/* <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="text-white text-lg bg-deverse-gradient">
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