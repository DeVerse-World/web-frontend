import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
    label: string;
    eventKey: string;
}

export default function FilterHeader(props: Props) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(props.eventKey, null);
    const isCurrentEventKey = activeEventKey === props.eventKey;
    return (
        <div
            className="bg-slate-700 text-blue-300 flex flex-row justify-between items-center cursor-pointer p-2 text-lg"
            onClick={decoratedOnClick}>
            {props.label}
            {isCurrentEventKey ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
    );
}