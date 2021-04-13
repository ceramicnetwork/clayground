const CeramicClient = require('@ceramicnetwork/http-client').default
const { TileDoctype } = require('@ceramicnetwork/doctype-tile')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const { randomBytes } = require('@stablelib/random')

const API_URL = 'http://localhost:7007'
const DID_SEED = randomBytes(32) // Do not lose this!

async function main() {
  const ceramic = new CeramicClient(API_URL)

  const didProvider = new Ed25519Provider(DID_SEED)

  await ceramic.setDIDProvider(didProvider)

  const tileParams = { content: { hello: 'ceramic'} }

  const context = {
    did: ceramic.did,
    api: ceramic,
    provider: didProvider
  }

  const docOpts = {
    anchor: true,
    publish: true
  }

  const tile = await TileDoctype.create(
    tileParams,
    context,
    docOpts
  )

  console.log('tile', tile)
}

main().then(() => {
  console.log('Done')
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
