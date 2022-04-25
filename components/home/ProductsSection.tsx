import React, { useState } from "react";
import { Image, Modal } from "react-bootstrap";
import { FeatureStatus } from "../../data/enum/feature_status";


function ProductSection(props) {
    const renderProductList = () => {
        const items: ProductionSectionData[] = [
            {
                icon: "product-ad",
                name: "ads",
                status: FeatureStatus.IN_PROGRESS,
                description: "This is description about Ad service This is description about Ad service This is description about Ad service This is description about Ad service This is description about Ad service"
            },
            {
                icon: "product-dao",
                name: "dao",
                status: FeatureStatus.PENDING,
                description: "This is description about Ad service"
            },
            {
                icon: "product-decentralised-graphic-sharing",
                name: "Dec Graphic Sharing",
                status: FeatureStatus.PENDING,
                description: "This is description about Ad service n about Ad s"
            },
            {
                icon: "product-decentralised-subworld-hosting",
                name: "Dec subworld hosting",
                status: FeatureStatus.PLANNING,
                description: "This is description about Ad service n about Ad s"
            },
            {
                icon: "product-integrity-validation",
                name: "integrity validation",
                status: FeatureStatus.IN_PROGRESS,
                description: "This is description about Ad service"
            },
            {
                icon: "product-quest-creator-tool",
                name: "quest creator tool",
                status: FeatureStatus.PENDING,
                description: "This is description about Ad service"
            },
            {
                icon: "product-sdk",
                name: "sdk",
                status: FeatureStatus.IN_PROGRESS,
                description: "This is description about Ad service"
            },
            {
                icon: "product-smart-nft",
                name: "smart NFT",
                status: FeatureStatus.PLANNING,
                description: "This is description about Ad service"
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