import { MarketplaceTab } from "../../components/marketplace_tab";

type ListingTabProps = {
    label: string,
    tab: MarketplaceTab,
    isSelected: MarketplaceTab,
    onSelect: (MarketplaceTab) => void
}

function ListingTabComponent(props: ListingTabProps) {
    let bg = "p-1 cursor-pointer ";
    if (props.isSelected == props.tab) {
        bg += "text-blue-500 "
    }

    return (
        <span className={bg} onClick={() => props.onSelect(props.tab)}>{props.label}</span>
    )
}

export default ListingTabComponent;