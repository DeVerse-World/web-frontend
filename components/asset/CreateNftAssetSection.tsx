import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { useAlert } from 'react-alert'
import MarketplaceMenu from './MarketplaceMenu'
import AssetService from "../../data/services/asset_service";
import CIDTool from 'cid-tool';
import BaseService from "../../data/services/base_service";
import ApiStrategy = BaseService.ApiStrategy;
import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap'
import Ipfs_service from "../../data/services/ipfs_service";

// 2dImg, race, skin, gameplay, bot

export default function CreateNftAssetSection() {
    const [fileUri, setfileUri] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', assetType: '', supply: '1' })
    const uploadFileRef = useRef(null);
    const router = useRouter();
    useEffect(() => {
        if ('fileUri' in router.query) {
            setfileUri(`https://ipfs.infura.io/ipfs/${router.query['fileUri']}`);
        }
    })

    const alert = useAlert()

    const onUploadAsset = async (e) => {
        const file = e.target.files[0]
        try {
            const added = await Ipfs_service._client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setfileUri(url)
            setFileName(file.name)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    // Qm: CIDv0
    // bafy: CIDv1
    // f017...: bytes32 or base16 encoding
    // https://stackoverflow.com/questions/66927626/how-to-store-ipfs-hash-on-ethereum-blockchain-using-smart-contracts
    // # https://github.com/multiformats/js-cid-tool
    // const added = await client.add(data, { cidVersion: 1 })
    const createItem = async () => {
        const { name, description, price, assetType, supply } = formInput
        if (!name || !description || !price || !assetType || !fileUri || !supply) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, assetType, supply, fileUri: fileUri, fileName: fileName
        })
        try {
            const added = await Ipfs_service._client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            let ipfsHashString = '0x' + CIDTool.format(CIDTool.base32(added.path), { base: 'base16' }).toString().slice(9)
            alert.show(`file ipfs ${url}`)
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            /* next, create the item */
            await AssetService.mint(ApiStrategy.REST, ipfsHashString, supply)
            alert.show(`Successfully minted`)
            // router.push('/marketplace')
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="flex justify-center text-white my-8">
            <div className="flex flex-col space-y-2 min-w-[300px] w-[40vw]">
                <InputGroup>
                    <FormControl
                        placeholder="Asset Name"
                        aria-label="Asset Name"
                        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl className='h-[100px]'
                        placeholder="Description"
                        aria-label="Description"
                        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl
                        placeholder="Price"
                        aria-label="Price"
                        inputMode='numeric'
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <InputGroup.Text className='deverse-gradient text-white'>ETH</InputGroup.Text>
                </InputGroup>
                <InputGroup>
                    <FormControl
                        placeholder="Number of supply"
                        inputMode='numeric'
                        aria-label="Supply"
                        onChange={e => updateFormInput({ ...formInput, supply: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl
                        placeholder="Asset Type"
                        aria-label="Asset Type"
                        value={formInput.assetType}
                        onChange={e => updateFormInput({ ...formInput, assetType: e.target.value })}
                    />
                    <DropdownButton
                        variant='outline-primary'
                        // className='deverse-gradient'
                        style={{
                            backgroundImage: "linear-gradient(to bottom, rgb(97 198 208), rgb(64 175 217))"
                        }}
                        title="Choose"
                        onSelect={(e: string) => {
                            updateFormInput({ ...formInput, assetType: e })
                        }}
                    >
                        <Dropdown.Item eventKey="2D Image" >2D Image</Dropdown.Item>
                        <Dropdown.Item eventKey="Character Race">Character Race</Dropdown.Item>
                        <Dropdown.Item eventKey="Character Skin">Character Skin</Dropdown.Item>
                        <Dropdown.Item eventKey="New Gameplay mode">New Gameplay mode</Dropdown.Item>
                        <Dropdown.Item eventKey="New Bot Logic">New Bot Logic</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
                <InputGroup>
                    <FormControl
                        placeholder="Asset URL"
                        aria-label="Asset URL"
                        disabled={true}
                        value={fileUri}
                    />
                    <Button className='deverse-gradient'
                        onClick={e => {
                            uploadFileRef.current.click();
                        }}>Choose File</Button>
                </InputGroup>
                <input
                    ref={uploadFileRef}
                    hidden={true}
                    type="file"
                    name="Asset"
                    onChange={onUploadAsset}
                />
                {
                    fileUri && (
                        <img className="rounded mt-4" width="350" src={fileUri} />
                    )
                }
                <button className="font-bold mx-auto deverse-gradient rounded-[16px] p-4"
                    onClick={createItem} >
                    Create Digital Asset
                </button>
            </div>
        </div>
    )
}
