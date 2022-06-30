import { useState } from "react";
import { Card, Collapse } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type CollapsableInfoCardProps = {
    title: string,
    body: any,

}

function CollapsableInfoCard(props: CollapsableInfoCardProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onToggleContent = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <Card className='my-2 text-white' style={{}}>
            <Card.Header className="cursor-pointer" style={{
                background: 'black'
            }} onClick={onToggleContent}>
                <span className='flex flex-row justify-between'>
                    {props.title}
                    {
                        isCollapsed
                            ? <IoIosArrowUp fontSize="1.5rem" />
                            : <IoIosArrowDown fontSize="1.5rem" />
                    }
                </span>
            </Card.Header>
            <Collapse in={isCollapsed}>
                <div>
                    <Card.Body style={{
                        background: 'rgb(51 65 85)'
                    }}>
                        {props.body}
                    </Card.Body>
                </div>

            </Collapse>
        </Card>
    )
}

export default CollapsableInfoCard;