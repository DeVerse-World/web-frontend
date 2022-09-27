import { MarketplaceTab } from "./marketplace_tab";

type ListingTabProps = {
    label: string,
    tab: MarketplaceTab,
    isSelected: MarketplaceTab,
    isDisable?: boolean,
    onSelect: (MarketplaceTab) => void
}

function ListingTabComponent(props: ListingTabProps) {
    let bg = "text-lg filter-tab";
    if (props.isSelected == props.tab) {
        bg += " active"
    } else if (props.isDisable) {
        bg += "-disable"
    }

    return (
        <div className={bg} onClick={() => {
            if (props.isDisable)
                return
            props.onSelect(props.tab)
        }}>
            {props.label}
        </div>
    )
}

export default ListingTabComponent;