import {ethers} from 'ethers'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'
import Web3Modal from 'web3modal'
import {useAlert} from 'react-alert'
import MarketplaceNavbar from '../../components/MarketplaceNavbar'
import AssetService from "../../data/services/asset_service";
import CIDTool from 'cid-tool';
import BaseService from "../../data/services/base_service";
import ApiStrategy = BaseService.ApiStrategy;
import React, { useEffect, useState } from "react";

// @ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function CreateItem() {
    const router = useRouter()
    const [fileUri, setfileUri] = useState( null)
    console.log(router.query['fileUri'])
    console.log(fileUri);
    const [fileName, setFileName] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', assetType: '', supply: '1' })

    useEffect(() => {
        if ('fileUri' in router.query) {
            setfileUri(`https://ipfs.infura.io/ipfs/${router.query['fileUri']}`);
        }
    })

    const alert = useAlert()

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(
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
    async function createMarket() {
        const { name, description, price, assetType, supply } = formInput
        if (!name || !description || !price || !assetType || !fileUri || !supply) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, assetType, supply, fileUri: fileUri, fileName: fileName
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            let ipfsHashString = '0x' + CIDTool.format(CIDTool.base32(added.path), { base: 'base16'}).toString().slice(9)
            alert.show(`file ipfs ${url}`)
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createMint(ipfsHashString, supply)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    //
    async function createMint(ipfsHashString, supply) {
        console.log("A")
        // console.log(signer);
        /* next, create the item */
        await AssetService.mint(ApiStrategy.REST, ipfsHashString, supply)
        alert.show(`Successfully minted`)
        // router.push('/marketplace')
    }

    return (
        <div className="flex justify-center">
            <div>
                <MarketplaceNavbar />
            </div>
            <div className="w-1/2 flex flex-col pb-12">
    <input
        placeholder="Asset Name"
    className="mt-8 border rounded p-4"
    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
    />
    <textarea
    placeholder="Asset Description"
    className="mt-2 border rounded p-4"
    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
    />
    <input
    placeholder="Asset Price in Eth"
    className="mt-2 border rounded p-4"
    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
    />
    <input
        placeholder="Number of supply"
        className="mt-2 border rounded p-4"
        onChange={e => updateFormInput({ ...formInput, supply: e.target.value })}
    />
    <input
    placeholder="Asset Type"
    type="dropdown"
    onChange={e => updateFormInput({ ...formInput, assetType: e.target.value })}
    list="assetTypes"
    />
    <datalist id="assetTypes">
    <option value="2dImg">2D Image</option>
    <option value="race">Character Race</option>
    <option value="skin">Character Skin</option>
    <option value="gameplay">New Gameplay mode</option>
    <option value="bot">New Bot Logic</option>
    </datalist>
    <text>Asset URL: {fileUri}</text>
    <input
    type="file"
    name="Asset"
    className="my-4"
    onChange={onChange}
    />
    {
        fileUri && (
            <img className="rounded mt-4" width="350" src={fileUri} />
    )
    }
    <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
        Create Digital Asset
    </button>
    </div>
    </div>
)
}
