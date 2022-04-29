/* import the ipfs-http-client library */
import { create } from 'ipfs-http-client';
/* Create an instance of the client */
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
// /* upload the file */
// const added = await client.add(file)
// /* or a string */
// const added = await client.add('hello world')

import bs58 from 'bs58';
import BN from 'bn.js'

export function ipfsHashToBytes32(ipfs_hash) {
    console.log(bs58.decode(ipfs_hash))
    var h = bs58.decode(ipfs_hash).toString('hex').replace(/^1220/, '');
    // if (h.length != 64) {
    //     console.log('invalid ipfs format', ipfs_hash, h);
    //     return null;
    // }
    return '0x' + h;
}

export function bytes32ToIPFSHash(hash_hex) {
    //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
    var buf = new Buffer(hash_hex.replace(/^0x/, '1220'), 'hex')
    return bs58.encode(buf)
}

export function numStringToBytes32(num) {
    var bn = new BN(num).toTwos(256);
    return padToBytes32(bn.toString(16));
}

export function bytes32ToNumString(bytes32str) {
    bytes32str = bytes32str.replace(/^0x/, '');
    var bn = new BN(bytes32str, 16).fromTwos(256);
    return bn.toString();
}

export function padToBytes32(n) {
    while (n.length < 64) {
        n = "0" + n;
    }
    return "0x" + n;
}
