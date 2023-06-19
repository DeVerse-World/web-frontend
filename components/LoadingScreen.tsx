import { useContext } from "react";
import { AppContext, ViewState } from "./contexts/app_context";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type LoadingProps = {
    forceShow?: boolean;
}

function LoadingScreen(props: LoadingProps) {
    const { viewState } = useContext(AppContext);
    return ;
    return (viewState == ViewState.LOADING || props.forceShow == true) &&
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            flexGrow: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99
        }}>
            <img className="app-logo" alt="App-logo" src="images/logo-text.webp"/>
        </div>
}

export default LoadingScreen;