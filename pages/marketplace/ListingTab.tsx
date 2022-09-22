import { MarketplaceTab } from "../../components/marketplace_tab";

type ListingTabProps = {
    label: string,
    tab: MarketplaceTab,
    isSelected: MarketplaceTab,
    isDisable?: boolean,
    onSelect: (MarketplaceTab) => void
}

function ListingTabComponent(props: ListingTabProps) {
    let bg = "cursor-pointer text-blue-300";
    if (props.isSelected == props.tab) {
        bg = "cursor-pointer"
    } else if (props.isDisable) {
        bg = "cursor-default text-slate-600"
    }

    return (
        <div className="px-1 text-lg" >
            <span className={bg} onClick={() => {
                if (props.isDisable) return
                props.onSelect(props.tab)
            }}>{props.label}</span>
        </div>
    )
}

export default ListingTabComponent;