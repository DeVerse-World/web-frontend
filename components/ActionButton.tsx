import { useContext } from "react";
import { AppContext } from "./contexts/app_context";
import Button from "./Button";

type Props = {
  className?: string;
  href: string;
  imgSrc: string;
  buttonText: string;
  disabled: boolean;
};

function ActionButton({href, imgSrc, buttonText, disabled}: Props) {
  const { remoteConfig } = useContext(AppContext);
  const onDownload = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      // Optionally, stop the event from propagating further
      e.stopPropagation();
      return;
    }
  };

  return (
    <div className="relative inline-block">
      <Button
      href={disabled ? "#" : href}
      className={`flex items-center gap-x-1 download-button max-button-size ${disabled ? 'disabled-button' : ''}`}
      onClick={onDownload}
      disabled={disabled}
    >
        <img src={imgSrc} alt="" className="icon-size scale-down"/>
        {buttonText}
      </Button>
      <svg className= "svg-hover-move absolute top-0 left-0" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H1V6H0V0Z" fill="#D9D9D9"/>
        <path d="M0 0H6V1H0V0Z" fill="#D9D9D9"/>
      </svg>
      <svg className= "svg-hover-move absolute bottom-0 right-0 transform" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6H5L5 0H6L6 6Z" fill="#D9D9D9"/>
        <path d="M6 6L0 6V5L6 5V6Z" fill="#D9D9D9"/>
      </svg>
    </div>
  );
}

export default ActionButton;
