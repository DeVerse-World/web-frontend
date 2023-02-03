import { SecondaryTab } from "./marketplace_tab";

type ListingTabItemProps = {
    label?: string,
    tab: SecondaryTab,
    isSelected: SecondaryTab,
    isDisable?: boolean,
    onSelect: (MarketplaceTab) => void
}

function ListingTabComponent(props: ListingTabItemProps) {
    let bg = "text-lg filter-tab";
    if (props.isSelected === props.tab) {
        bg += " active"
    } else if (props.isDisable) {
        bg += "-disable"
    }

    return (
        <span className={bg} onClick={() => {
            if (props.isDisable)
                return
            props.onSelect(props.tab)
        }}>
            {props.label || props.tab}
        </span>
    )
}

export default ListingTabComponent;