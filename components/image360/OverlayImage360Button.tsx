import React, { useState } from "react";
import OverlayImage360 from "./OverlayImage360";

const OverlayImage360Button = ({ source, className, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <OverlayImage360 source={source} open={open} setOpen={setOpen} />
            <button
                type="button"
                className={className}
                onClick={() => setOpen(true)}
            >
                {children}
            </button>
        </div>
    )

}

export default OverlayImage360Button;