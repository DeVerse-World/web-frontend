import customProtocolCheck from "custom-protocol-check";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import EpicDownloadButton from "../EpicDownloadButton";
import { Button } from "react-bootstrap";
import { UserIcon, UserGroupIcon } from "@heroicons/react/24/outline";

type Props = {
  templateId?: string;
  onClose: () => void;
};

export default function PlayModal(props: Props) {
  const [showDownload, setShowDownload] = useState(false);

  const openApp = (templateId, mode) => {
    if (templateId) {
      let appUrl = `deverseworld://?template_id=${props.templateId}&mode=${mode}`;
      customProtocolCheck(
        appUrl,
        () => {
          setShowDownload(true);
        },
        () => {
          console.log(
            "Custom protocol found and opened the file successfully."
          );
        },
        1000
      );
    } else {
      window.alert("missing template id");
    }
  };

  const renderBody = () => {
    if (showDownload) {
      return (
        <Modal.Body className="text-white text-lg break-words flex flex-col items-center">
          <p className="text-white text-center">
            Download game client to start your journey.
          </p>
          <EpicDownloadButton />
          <br />
        </Modal.Body>
      );
    }
    return (
      <Modal.Body className="text-white text-lg break-words flex flex-row gap-5 items-center justify-content-center">
        <Button
          id="btn-play-offline"
          className="secondary-action-button"
          onClick={(e) => {
            e.stopPropagation();
            openApp(props.templateId, "OFFLINE");
          }}
        >
          <div className="group flex gap-x-2">
            <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            SinglePlay
          </div>
        </Button>
        <Button
          id="btn-play-online"
          className="secondary-action-button"
          onClick={(e) => {
            e.stopPropagation();
            openApp(props.templateId, "ONLINE");
          }}
        >
          <div className="group flex gap-x-2">
            <UserGroupIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            MultiPlay
          </div>
        </Button>
      </Modal.Body>
    );
  };

  return (
    <Modal
      centered
      show={true}
      onHide={props.onClose}
      contentClassName="bg-black"
      dialogClassName="deverse-dialog"
    >
      {showDownload ? (
        <Modal.Header className="flex flex-row justify-content-center">
          <h4 className="text-white text-center">
            <b>Download</b>
          </h4>
        </Modal.Header>
      ) : (
        <Modal.Header className="flex flex-row justify-content-center">
          <h4 className="text-white text-center">
            <b>Launch World</b>
          </h4>
        </Modal.Header>
      )}
      {renderBody()}
    </Modal>
  );
}
