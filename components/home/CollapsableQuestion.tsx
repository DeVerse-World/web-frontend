import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { PlusIcon } from "@heroicons/react/20/solid";

type CollapsableQuestionProps = {
  question: string;
  answer: string;
};

export default function CollapsableQuestion(props: CollapsableQuestionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-4">
      <Button
        onClick={() => setOpen(!open)}
        variant="link"
        style={{
          color: "#facc14",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "500",
          width: "100%",
        }}
      >
        <PlusIcon
          className="h-7 w-7 flex-shrink-0 float-end pl-2"
          aria-hidden="true"
        />
        {props.question}
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">{props.answer}</div>
      </Collapse>
    </div>
  );
}
