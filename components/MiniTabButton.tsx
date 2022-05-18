import React, { MouseEventHandler } from "react";

type MiniTabButtonProps = {
    title: string;
    isSelected?: boolean;
    onClick?: MouseEventHandler | undefined;
}

export function MiniTabButton(props: MiniTabButtonProps) {

    const selectedStyle: React.CSSProperties = {
        background: "linear-gradient(to bottom, rgb(65, 117, 230), rgb(18, 54, 173))"
    }

    return (
        <h2 className="deverse-gradient rounded mx-1 py-2 px-8 cursor-pointer"
            style={(props.isSelected || false) ? selectedStyle : null}
            onClick={props.onClick}>{props.title}</h2>
    )
}