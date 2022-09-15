import process from 'node:process'
import { dsKeyToCid } from '../common.js'

async function main() {
    const dsKey = process.env.DS_KEY
    const cid = dsKeyToCid(dsKey.toLocaleLowerCase())
    console.log(cid.toString())
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
