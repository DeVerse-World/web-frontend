
type ListingTabProps = {
    label: string,
    isSelected: boolean,
    onSelect: () => void
}

function ListingTabComponent(props: ListingTabProps) {
    let bg = "p-1 cursor-pointer ";
    if (props.isSelected) {
        bg += "text-blue-500 "
    }

    return (
        <span className={bg} onClick={props.onSelect}>{props.label}</span>
    )
}

export default ListingTabComponent;