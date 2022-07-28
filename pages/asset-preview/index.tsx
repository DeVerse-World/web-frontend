import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Card, Collapse } from 'react-bootstrap';
import Footer from '../../components/common/Footer';
import ModelViewer from '../../components/ModelViewer';
import AssetService from "../../data/services/AssetService";
import { IoIosArrowDown } from 'react-icons/io';
import CollapsableInfoCard from './collapsable_info_card';

function AssetPreviewScreen(props: WithRouterProps) {
    const [modelPath, setModelPath] = useState<string>(null);

    const handleIFrameEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me')) {
            return;
        }
        let glbUri = e.data;
        console.log(e);
        setModelPath(glbUri);
    }

    useEffect(() => {
        setModelPath('https://d1a370nemizbjq.cloudfront.net/38661c86-1829-4fc5-b327-56e13f8727f7.glb')
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
        }
    }, [props.router.isReady])

    return (
        <section id="deverse-asset-preview flex flex-col">

            <div className='grid grid-cols-1 md:grid-cols-2 '>
                <div className='flex flex-col align-middle p-8'>
                    {
                        modelPath &&
                        <div className='border-4 rounded-lg bg-white min-h-[500px]'>
                            <ModelViewer filePath={modelPath} />
                        </div>
                    }

                    <CollapsableInfoCard title='Description' body={
                        <div>
                            Description
                        </div>
                    } />

                    <CollapsableInfoCard title='Properties' body={
                        <div>
                            Detail about this NFT goes here
                        </div>
                    } />
                    <CollapsableInfoCard title='Property Detail' body={
                        <div>
                            Detail about this NFT goes here
                        </div>
                    } />
                    <CollapsableInfoCard title='Further detail' body={
                        <div>
                            Detail about this NFT goes here
                        </div>
                    } />
                </div>
                <div className='flex flex-col align-middle text-white p-8'>
                    <div>
                        <h1>A sexy avatar</h1>
                    </div>
                    <div className='flex flex-row'>
                        <p >Owned by a dude</p>
                        <p className='mx-2'>33 views</p>
                        <p>68 favorites</p>
                    </div>
                    <div id='asset-offer' className='flex flex-col border-2 rounded-md p-8 w-[80%] bg-black'>
                        <div>
                            Highest offer: 9 ether
                        </div>
                        <button className='p-4 mt-4 w-[50%] bg-deverse-gradient rounded-2xl'>
                            Make offer
                        </button>
                    </div>
                    <CollapsableInfoCard title='Price History' body={
                        <div>
                            Detail about this NFT goes here
                        </div>
                    } />
                    <CollapsableInfoCard title='Listings' body={
                        <div>
                            Detail about this NFT goes here
                        </div>
                    } />
                    <CollapsableInfoCard title='Offers' body={
                        <div>
                            Detail about this NFT goes here
                        </div>
                    } />
                </div>
            </div>
            <div className='p-8'>
                <CollapsableInfoCard title='Item activity' body={
                    <div>
                        Description
                    </div>
                } />
            </div>
            <Footer />
        </section>
    )
}
const AssetPreview = withRouter(AssetPreviewScreen);
export default AssetPreview;