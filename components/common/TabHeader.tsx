import { Nav } from "react-bootstrap";

type Props = {
    label: string;
    eventKey: any;
    selectedTab: any;
}

function TabHeader(props: Props) {
    let className = "tab-header";
    if (props.selectedTab == props.eventKey) {
        className += " active";
    }
    return (
        <Nav.Item className={className}>
            <Nav.Link className="text-white" eventKey={props.eventKey}>{props.label}</Nav.Link>
        </Nav.Item>
    )
}

export default TabHeader;