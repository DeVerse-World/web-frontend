import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';

export default function Account() {
    return (
        <div>
            <div className="flex flex-col bg-blue m-16 p-4 border-2 rounded-sm border-black">
                <h1>$DVRS</h1>
                <b>123 Coins</b>
                <div className="flex flex-row item-center justify-end">
                    <Button className="btn btn-primary w-32 mx-2">Buy</Button>
                    <Button className="btn btn-primary w-32 mx-2">Swap</Button>
                </div>
            </div>
            <div className="flex flex-col bg-blue m-16 p-4 border-2 rounded-sm border-black">
                
            </div>
        </div>
    );
}