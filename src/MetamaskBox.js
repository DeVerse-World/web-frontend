import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import React from "react";
import { getOrCreateWallet, authMetamask, authLoginLink } from "./api/wallet";


function MetamaskBox() {
  const { status, connect, account } = useMetaMask();

  if (status === "connected") {
    // && current_wallet != null) {
    const authMetamaskWrapper = async () => {
      const web3 = new ethers.providers.Web3Provider(window.ethereum);
      // TODO: Validate jwt token in another flow instead
      const dbUser = await getOrCreateWallet(account);
      if (dbUser.nonce) {
        const signature = await web3
          .getSigner()
          .signMessage(`I am signing my one-time nonce: ${dbUser.nonce}`);
        // await authMetamask(account, signature);
        // if (localStorage.getItem("session_key")) {
        await authLoginLink(localStorage.getItem("session_key"), account, signature)
        // }

        localStorage.setItem("wallet_address", account);
      }
    };
    authMetamaskWrapper();
    return (
      <div className="header__option metamask_box">
        <span className="header__optionLineOne">
          0x...{account.substr(account.length - 5)}
        </span>
      </div>
    );
  }

  if (status === "initializing")
    return (
      <div className="header__option metamask_box">
        <span className="header__optionLineOne">Syncing</span>
        <span className="header__optionLineTwo" >
          Metamask
        </span>
      </div>
    );

  if (status === "unavailable")
    return (
      <div className="header__option metamask_box">
        <span className="header__optionLineOne">Not available</span>
        <span className="header__optionLineTwo">Metamask</span>
      </div>
    );

  if (status === "notConnected")
    return (
      <div className="header__option metamask_box">
        <span className="header__optionLineOne">Connect to</span>
        <span className="header__optionLineTwo" onClick={connect}>
          Metamask
        </span>
      </div>
    );

  if (status === "connecting")
    return (
      <div className="header__option metamask_box">
        <span className="header__optionLineOne">Connecting</span>
        <span className="header__optionLineTwo">Metamask</span>
      </div>
    );
}

export default MetamaskBox;
