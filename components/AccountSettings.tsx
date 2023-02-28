import { useContext } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { AppContext } from "./contexts/app_context";

function AccountSetting() {
    const { user } = useContext(AppContext);
    return (
        <div className="flex flex-col items-center text-white">
            <div>
                <InputGroup>
                    <InputGroup.Text>Name</InputGroup.Text>
                    <FormControl id="input-user-name"
                        placeholder="Name"
                        aria-label="Name"
                        value={user.name}
                        readOnly
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Email</InputGroup.Text>
                    <FormControl id="input-user-email"
                        placeholder="Email"
                        aria-label="Email"
                        value={user.social_email}
                        readOnly
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Wallet Address</InputGroup.Text>
                    <FormControl id="input-user-wallet"
                        placeholder=""
                        aria-label=""
                        value={user.wallet_address}
                        readOnly
                    />
                </InputGroup>
            </div>

        </div>
    )
}

export default AccountSetting;