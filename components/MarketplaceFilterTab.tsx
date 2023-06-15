import { Accordion } from "react-bootstrap";
import FilterHeader from "./FilterHeader";
import FilterTab from "./FilterTab";

type Props = {
    defaultTab: MarketplaceTabKey;
}

export enum MarketplaceTabKey {
    WORLD_TYPE = "world", EVENT_TYPE = "event", NFT_TYPE = "nft"
}

export const MarketplaceType = {
    [MarketplaceTabKey.WORLD_TYPE]: [
        'all',
    ],
    [MarketplaceTabKey.EVENT_TYPE]: [
        'all',
        'battle',
        'concert',
        'gallery',
        'giveaway',
        'showcase',
        'simulation',
        'treasure hunt',
    ],
    [MarketplaceTabKey.NFT_TYPE]: [
        'all',
        'image',
        'avatar',
        // 'race',
        // 'game',
        // 'bot logic',
    ],
}

export default function MarketplaceFilter(props: Props) {
    return (
        <div className="h-[100%] bg-gray-900 w-[160px]">
            <Accordion defaultActiveKey={props.defaultTab} className="text-white" flush>
                <FilterHeader eventKey={MarketplaceTabKey.WORLD_TYPE} label={'Worlds'} />
                <Accordion.Collapse eventKey={MarketplaceTabKey.WORLD_TYPE}>
                    <FilterTab
                        type="world"
                        data={MarketplaceType[MarketplaceTabKey.WORLD_TYPE].map(subtype => ({ label: MarketplaceTabKey.WORLD_TYPE, subType: subtype }))}
                    />

                </Accordion.Collapse>
                <FilterHeader eventKey={MarketplaceTabKey.EVENT_TYPE} label='Events' />
                <Accordion.Collapse eventKey={MarketplaceTabKey.EVENT_TYPE} className="flex flex-col">
                    <FilterTab type="event" data={[
                        { label: "All" },
                        { label: "Battle", subType: "battle" },
                        { label: "Concert", subType: "concert" },
                        { label: "Gallery", subType: "gallery" },
                        { label: "Giveaway", subType: "giveaway" },
                        { label: "Showcase", subType: "showcase" },
                        { label: "Simluation", subType: "simluation" },
                        { label: "Treasure Hunt", subType: "treasure Hunt" }
                    ]} />
                </Accordion.Collapse>
                <FilterHeader eventKey={MarketplaceTabKey.NFT_TYPE} label='NFT' />
                <Accordion.Collapse eventKey={MarketplaceTabKey.NFT_TYPE}>
                    <FilterTab type="nft" data={[
                        { label: "All" },
                        { label: "Image", subType: "image" },
                        { label: "Avatar", subType: "avatar" },
                        // { label: "Race", subType: "race", disabled: true },
                        // { label: "Game", subType: "game", disabled: true },
                        // { label: "Bot Logic", subType: "bot-logic", disabled: true },
                    ]} />
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}