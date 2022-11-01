import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function FilterHeader({ label, eventKey }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, null);
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
        <div
            className="bg-slate-900 text-blue-300 flex flex-row justify-between items-center filter-header"
            onClick={decoratedOnClick}>
            {label}
            {isCurrentEventKey ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
    );
}