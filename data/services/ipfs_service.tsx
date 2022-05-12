import { create as ipfsHttpClient } from 'ipfs-http-client'

class IPFSService {
    _client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
}

export default new IPFSService();