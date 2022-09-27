import { WithRouterProps } from 'next/dist/client/with-router';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Footer from '../../components/common/Footer';
import ModelViewer from '../../components/ModelViewer';
import AssetService from "../../data/services/AssetService";
import { Avatar } from '../../data/model/avatar';
import AvatarService from '../../data/services/AvatarService';
import { FaEthereum } from 'react-icons/fa';
import { formatWalletAddress } from '../../utils/wallet_util';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function AssetPreviewScreen(props: WithRouterProps) {
    const router = useRouter();
    const [avatar, setAvatar] = useState<Avatar>(null);
    const [modelPath, setModelPath] = useState<string>(null);
    const [creatorAddress, setCreatorAddress] = useState<string>();

    useEffect(() => {
        if (!router.isReady) return;
        let query = router.query;

        if (query['model']) {
            // console.log(AssetService.getFullAssetUrl(`${query['model'] as string}`))
            setModelPath(AssetService.getFullAssetUrl(`${query['model'] as string}`));
        } else if (query['avatarId'] && !isNaN(parseInt(query['avatarId'] as string))) {
            AvatarService.getAvatar(parseInt(query['avatarId'] as string)).then(value => {
                setAvatar(value);
                setModelPath(value.preprocess_url)
            });
        }
        const mockWallet = "0x4Fc5Ea43E74B2b20b37F905B7D7f87FA2A5362Dd";
        setCreatorAddress(formatWalletAddress(mockWallet))

    }, [router.isReady])

    return (
        <section id="section-content" className='flex flex-col gap-4'>
            <div className='m-auto my-4 flex-grow flex flex-row gap-4'>
                <div className='flex flex-col items-center gap-4'>
                    {
                        modelPath &&
                        <div className='rounded-2xl border-4 bg-white md:w-[300px] md:h-[400px] w-[350px] '>
                            <Canvas >
                                <ModelViewer filePath={modelPath} position={[0, -1, 0]}/>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                <spotLight position={[-10, -10, 0]} angle={0.55} penumbra={1} />
                                <pointLight position={[-10, -10, -10]} />
                                <OrbitControls makeDefault zoomSpeed={2} />
                                {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
                                {/* <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}></PresentationControls> */}
                            </Canvas>
                        </div>
                    }
                    <button className="w-[120px] h-[40px] rounded-3xl flex flex-row justify-center items-center text-white deverse-play-btn font-bold">BUY</button>
                </div>
                <div className='flex flex-col text-blue-300 w-[300px]'>
                    <div className='text-3xl'>{avatar?.name || "Avatar Name"}</div>
                    <div>0/10</div>
                    <div className='mt-8 flex flex-row justify-between'>
                        Deverse World
                        <div aria-label='abc' style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>{creatorAddress}</div>
                    </div>

                    <span className='w-full border-b-2 border-white'></span>
                    <div >
                        <div className='flex flex-row justify-between text-white'>
                            <span>Price</span>
                            <span className='flex-row flex items-center'>150 <FaEthereum /></span>
                        </div>
                        <div className='flex flex-row justify-between text-white'>
                            <span>Type</span>
                            <span>Companion</span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <span className='text-3xl'>Description</span>
                        <p className='text-white '>A long description will go here A long description will go here A long description will go here A long description will go here</p>
                    </div>
                </div>
            </div>



            {/* <div className='grid grid-cols-1 md:grid-cols-2 '>
                <div className='flex flex-col align-middle p-8'>


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
            </div> */}
            <Footer />
        </section>
    )
}
export default AssetPreviewScreen;