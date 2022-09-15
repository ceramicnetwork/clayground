import process from 'node:process'
import { CID } from 'multiformats/cid'
import { cidToDsKey } from '../common.js'

async function main() {
    const cidString = process.env.CID
    const cid = CID.parse(cidString)
    const dsKey = cidToDsKey(cid)
    console.log(dsKey)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
})
