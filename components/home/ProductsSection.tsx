import React, { useState } from "react";
import { Image, Modal } from "react-bootstrap";

function ProductSection(props) {
    const renderProductList = () => {
        const items: ProductionSectionData[] = [
            {
                icon: "product-ad",
                name: "ads",
                status: "Active",
                description: "This is description about Ad service This is description about Ad service This is description about Ad service This is description about Ad service This is description about Ad service"
            },
            {
                icon: "product-dao",
                name: "dao",
                status: "Active",
                description: "This is description about Ad service"
            },
            {
                icon: "product-decentralised-graphic-sharing",
                name: "Decentralised Graphic Sharing",
                status: "Active",
                description: "This is description about Ad service n about Ad s"
            },
            {
                icon: "product-decentralised-subworld-hosting",
                name: "Decentralised subworld hosting",
                status: "Active",
                description: "This is description about Ad service n about Ad s"
            },
            {
                icon: "product-integrity-validation",
                name: "integrity validation",
                status: "Active",
                description: "This is description about Ad service"
            },
            {
                icon: "product-quest-creator-tool",
                name: "quest creator tool",
                status: "in progress",
                description: "This is description about Ad service"
            },
            {
                icon: "product-sdk",
                name: "sdk",
                status: "Active",
                description: "This is description about Ad service"
            },
            {
                icon: "product-smart-nft",
                name: "smart NFT",
                status: "In Progress",
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
    status: string;
}


function ProductSectionItem(props: ProductionSectionData) {
    const [showDescription, setShowDescription] = useState(false);

    const onShowDescription = (e) => {
        setShowDescription(true);
    }

    return (
        <div key={props.name} className="p-4 w-[300px] relative cursor-default">
            <Image src={`/images/${props.icon}.png`}
                className="cursor-pointer"
                width={300} height={300}
                onClick={onShowDescription}
            />
            <h2 className="border-double border-4 border-sky-500 capitalize cursor-pointer"
                onClick={onShowDescription}>{props.name}</h2>
            <h6 className="uppercase">{props.status}</h6>
            <Modal centered show={showDescription} onHide={() => setShowDescription(false)}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="bg-sky-500">{props.description}</Modal.Body>
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