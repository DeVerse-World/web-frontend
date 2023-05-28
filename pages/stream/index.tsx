import { Form, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

type SwitchProps = {
    label: string;
    onChange: (isChecked: boolean) => void
}

function SwitchSetting(props: SwitchProps) {
    return (
        <div className="flex flex-row justify-between ">
            <span className="max-w-[75%]">{props.label}</span>
            <Form.Check type="switch" onChange={(e) => props.onChange(e.target.checked)} />
        </div>
    )
}

export default function Stream() {
    const handle = useFullScreenHandle();
    const [showSetting, setShowSetting] = useState(false);


    return (
        <div>
            <div id="section-content" className="p-4 flex flex-col gap-8 h-full">
                <h3>Experimental feature</h3>
                <button className="bg-deverse-gradient rounded-md p-2" onClick={() => setShowSetting(true)}>Launch Setting Panel</button>
                <button className="bg-deverse-gradient rounded-md p-2" onClick={handle.enter}>Launch Full screen mode</button>
            </div>
            {/* {handle.active &&
                <FullScreen handle={handle} className="text-white b">
                    {renderContent()}
                </FullScreen>}
            {!handle.active &&
                 */}
            <Offcanvas placement="end" show={showSetting} onHide={() => setShowSetting(false)}>
                <Offcanvas.Header className="bg-black text-white" closeButton closeVariant="white">
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={() =>
                    <div className="flex flex-col bg-black h-screen text-white px-4 min-w-[10vw] max-w-[600px]">
                        <SwitchSetting label='Enlarge display to fill window' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Is quality controller' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Match viewport resolution' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Offer to receive' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Prefer SFU' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Use microphone' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Force mono audio' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Force TURN' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Control Scheme: Locked Mouse' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Hide Browser Cursor' onChange={(isChecked) => console.log(isChecked)} />
                        <SwitchSetting label='Show FPS' onChange={(isChecked) => console.log(isChecked)} />
                    </div>
                }>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}