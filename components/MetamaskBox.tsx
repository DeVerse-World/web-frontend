import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import WalletService from "../data/services/wallet_service";

function MetamaskBox() {
  const { status, connect, account } = useMetaMask();
  const [boxContent, setBoxContent] = useState("");

  useEffect(() => {
    switch (status) {
      case "initializing":
        setBoxContent("Syncing");
        break;
      case "unavailable":
        setBoxContent("Metamask unavailable");
        break;
      case "notConnected":
        setBoxContent("Connect to Metamask");
        break;
      case "connecting":
        setBoxContent("Connecting to Metamask");
        break;
      case "connected":
        setBoxContent(account);
        //TODO: enable this after server online
        // WalletService.connectToMetamask(account);
        break;
      default:
        break;
    }
  }, [status])

  return (
    <Button onClick={connect}>
      {boxContent}
    </Button>
  )
}


export default MetamaskBox;
