import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Footer from '../../components/common/Footer';
import ModelViewer from '../../components/ModelViewer';
import AssetService from "../../data/services/asset_service";

function AssetPreviewScreen(props: WithRouterProps) {
    const [modelPath, setModelPath] = useState<string>(null);
    const [isRPOVisible, setIsRPOVisible] = useState(false);

    const handleIFrameEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me')) {
            return;
        }
        let glbUri = e.data;
        console.log(e);
        setModelPath(glbUri);
        setIsRPOVisible(false);
    }

    useEffect(() => {
        window.addEventListener('message', handleIFrameEvent);
        return () => {
            window.removeEventListener('keydown', handleIFrameEvent);
        };
    }, [])

    useEffect(() => {
        if (!props.router.isReady) return;
        let query = props.router.query;
        if (query['model']) {
            setModelPath(AssetService.getFullAssetUrl(query['model'] as string));
        } else {
            setIsRPOVisible(true);
        }
    }, [props.router.isReady])

    return (
        <>
            <section className='flex flex-col justify-center align-middle'>
                {/* <iframe hidden={!isRPOVisible} allow="camera *; microphone *" className='rpo' src='https://deverse.readyplayer.me/avatar?frameApi'></iframe> */}
                {modelPath && <ModelViewer filePath={modelPath} />}
                <Footer/>
            </section>
        </>
    )
}
const AssetPreview = withRouter(AssetPreviewScreen);
export default AssetPreview;