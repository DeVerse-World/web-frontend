import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { AppContext, ViewState } from "./contexts/app_context";

type LoadingProps = {
    text?: string;
}

const LoadingScreen: React.FC<LoadingProps> = (props) => {
    const { viewState } = useContext(AppContext); 
    let text = props.text || "Loading...";

    return  (viewState == ViewState.LOADING ?
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
            <Spinner animation="border" variant="light" style={{
                width:'70px',
                height:'70px'
            }}>
                
            </Spinner>
        </div>
        : null)
}

export default LoadingScreen;