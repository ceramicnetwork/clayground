import process from 'node:process'
import { CID } from 'multiformats/cid'
import * as dagJose from 'dag-jose'
import * as ipfsClient from 'ipfs-http-client'
import { IpfsApi } from '@ceramicnetwork/common'
import * as http from 'http'
import * as https from 'https'
import { dsKeyToCid } from '../common.js'

const IPFS_GET_TIMEOUT = 60000 // 1 minute

async function main() {
    const cid = dsKeyToCid(process.env.DS_KEY.toLocaleLowerCase())
    console.log('Creating ipfs...')
    const ipfs = await buildIpfsConnection(process.env.IPFS_API_URL || 'http://localhost:5001')
    console.log('Running persistence check...')
    const exists = await cidExistsInLocalIPFSStore(ipfs, cid)
    console.log(`Does CID(${cid}) exist? ${exists}`)
}

const ipfsHttpAgent = (ipfsEndpoint: string | ipfsClient.multiaddr) => {
    const agentOptions = {
        keepAlive: false,
        maxSockets: Infinity,
    }
    if (typeof ipfsEndpoint === 'string' && ipfsEndpoint.startsWith('https')) {
        return new https.Agent(agentOptions)
    } else {
        return new http.Agent(agentOptions)
    }
}

async function buildIpfsConnection(
    ipfsEndpoint: string
): Promise<IpfsApi> {
    return ipfsClient.create({
        url: ipfsEndpoint,
        ipld: { codecs: [dagJose] },
        timeout: IPFS_GET_TIMEOUT,
        agent: ipfsHttpAgent(ipfsEndpoint),
    })
}

async function cidExistsInLocalIPFSStore(ipfs: IpfsApi, cid: CID): Promise<boolean> {
    try {
        // With the 'offline' flag set loading a CID from ipfs should be functionally instantaneous
        // as there's no networking i/o happening. With go-ipfs this works as expected and trying
        // to load a CID that doesn't exist fails instantly with an error that the given key wasn't
        // found in the state store.  Unfortunately js-ipfs doesn't seem to respect the 'offline'
        // flag, so we approximate the behavior by setting a low timeout instead.
        const result = await ipfs.dag.get(cid, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // offline: true,
        // timeout: 200,
        })
        return result != null
    } catch (err) {
        console.warn(`Error loading CID ${cid.toString()} from local IPFS node: ${err}`)
        return false
    }
}

main()
  .then(() => {
    console.log('Done')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
