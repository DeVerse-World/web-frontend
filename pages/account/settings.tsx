import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useMetaMask } from "metamask-react";
import { useContext, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { AppContext } from "../../components/contexts/app_context";
import AccountService from "../../data/services/AccountService";
import { formatWalletAddress } from "../../utils/wallet_util";

function Settings() {
    const { user } = useContext(AppContext);
    const [currentWallet, setCurrentWallet] = useState(user?.wallet_address || '');
    const [currentEmail, setCurrentEmail] = useState(user?.social_email || '');
    const { connect } = useMetaMask();

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
        },
        onError: errorResponse => {
            console.log(errorResponse.error_description)
        }
    });

    const onLinkAccountWithGoogle = () => {
        // googleLogin();
        // AccountService.addUserModelWithGoogleMail(user.id, "abc")
    }

    const onLinkAccountWithMetamask = () => {

    }

    if (!user) {
        return <div>Login First</div>
    }

    return (
        <section className="flex flex-row gap-4 text-white">
            <h3 className="text-blue-300 text-3xl font-bold pl-4">Settings</h3>
            <div className="flex flex-col gap-2 py-4">
                <div className="flex flex-row gap-4">
                    <h5>Wallet Address</h5>
                    {!user?.social_email && user.wallet_address &&
                        <span className="text-blue-400 cursor-pointer" onClick={onLinkAccountWithGoogle} >(Link with Google)</span>
                    }
                </div>
                <InputGroup>
                    <FormControl id="wallet-address" required
                        placeholder="Wallet"
                        aria-label="Asset Name"
                        value={currentWallet}
                        readOnly={currentWallet.length > 0}
                    />
                </InputGroup>
                <div className="flex flex-row gap-4">
                    <h5>Email Address</h5>
                    {!user?.wallet_address && user.social_email &&
                        <span className="text-blue-400 cursor-pointer" onClick={onLinkAccountWithMetamask} >(Link with Metamask)</span>
                    }
                </div>
                <InputGroup>
                    <FormControl id="email-address" required
                        placeholder="Email"
                        aria-label="Asset Name"
                        value={currentEmail}
                        readOnly={currentEmail.length > 0}
                    />
                </InputGroup>
            </div>
        </section>
    )
}

Settings.getLayout = getAccountWrapperLayout;

export default Settings;