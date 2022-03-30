import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';

export default function Account() {
    return (
        <div>
            <div class="flex flex-col bg-blue m-16 p-4 border-2 rounded-sm border-black">
                <h1>$DVRS</h1>
                <b>123 Coins</b>
                <div class="flex flex-row item-center justify-end">
                    <Button class="btn btn-primary w-32 mx-2">Buy</Button>
                    <Button class="btn btn-primary w-32 mx-2">Swap</Button>
                </div>
            </div>
            <div class="flex flex-col bg-blue m-16 p-4 border-2 rounded-sm border-black">
                
            </div>
        </div>
    );
}