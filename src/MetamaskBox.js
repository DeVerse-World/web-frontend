import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import React from "react";
import { getOrCreateWallet, authMetamask } from "./api/wallet";


function MetamaskBox() {
  const { status, connect, account } = useMetaMask();

  if (status === "connected") {
    // && current_wallet != null) {
    const authMetamaskWrapper = async () => {
      const web3 = new ethers.providers.Web3Provider(window.ethereum);
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
