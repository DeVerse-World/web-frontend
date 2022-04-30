import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Link from 'next/link'
import Popup from 'reactjs-popup';
import { useAlert } from 'react-alert'
import MarketplaceNavbar from '../../components/MarketplaceNavbar'

import {
  nftaddress, nftmarketaddress
} from '../../config'

import NFT from '../../../smart-contracts/artifacts/contracts/v1/NFT.sol/NFT.json'
import Market from '../../../smart-contracts/artifacts/contracts/v1/Market.sol/NFTMarket.json'
import Marketplace from '../_app'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', assetType: '' })
  const router = useRouter()
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
      setFileUrl(url)
      setFileName(file.name)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price, assetType } = formInput
    if (!name || !description || !price || !assetType || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, assetType, fileUrl: fileUrl, fileName: fileName
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
      alert.show(`file ipfs ${url}`)
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace_v1 */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/marketplace_v1')
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
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  )
}
