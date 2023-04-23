import React, { useState } from "react";
import OverlayImage360 from "./OverlayImage360";

const OverlayImage360Button = ({ source }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <OverlayImage360 source={source} open={open} setOpen={setOpen} />
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                onClick={() => setOpen(true)}
            >
                View
            </button>
        </div>
    )

}

export default OverlayImage360Button;