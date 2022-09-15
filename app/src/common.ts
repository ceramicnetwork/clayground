import { CID } from 'multiformats/cid'
import { base32 } from "multiformats/bases/base32"
import * as multihashes from 'multihashes'

// const CID_VERSION_0 = 0
const CID_VERSION_1 = 1
const DAG_CBOR_CODE = 0x71

export function cidToDsKey(cid: CID): string {
    return base32.baseEncode(cid.multihash.bytes)
}

export function dsKeyToCid(key: string): CID {
    const bytes = base32.baseDecode(key)
    const multihash = multihashes.decode(Buffer.from(bytes))
    const multihashData = {
        code: multihash.code,
        size: multihash.length,
        digest: multihash.digest,
        bytes
    }
    return CID.create(CID_VERSION_1, DAG_CBOR_CODE, multihashData)
}
