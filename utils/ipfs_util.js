/* import the ipfs-http-client library */
import { create } from 'ipfs-http-client';
/* Create an instance of the client */
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
/* upload the file */
const added = await client.add(file)
/* or a string */
const added = await client.add('hello world')
