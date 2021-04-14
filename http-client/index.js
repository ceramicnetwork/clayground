const CeramicClient = require('@ceramicnetwork/http-client').default
const { TileDoctype } = require('@ceramicnetwork/doctype-tile')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const { randomBytes } = require('@stablelib/random')

const DID_SEED = randomBytes(32)

// Replace endpoints as needed
const API_URL = 'http://localhost:7007'
// const GATEWAY_URL = 'https://gateway-dev.ceramic.network'

// Replace stream ids as needed
const ANCHOR_STATUS_STREAM_ID = 'kjzl6cwe1jw149l4lq28hgdyexlfxi7kj841m6ada0vnlp33ai6tvlmrwpx7bav'
const PINNED_STREAM_ID = 'kjzl6cwe1jw1472k4wjm3dqicfkd72oyx01hljelwj81v8fk5wrus7w88n6tfbe'

async function main() {
  const didProvider = new Ed25519Provider(DID_SEED)

  const client = new CeramicClient(API_URL)
  await client.setDIDProvider(didProvider)


  const gateway = new CeramicClient(GATEWAY_URL)
  await gateway.setDIDProvider(didProvider)

  const context = {
    did: client.did,
    api: client,
    provider: didProvider
  }

  const stream = await createStream(context)
  await loadStreamFromGateway(gateway, stream.id)
  await getAnchorStatus(client)
  await updateTileStream(stream)
  await pinStream(client, stream.id)
  await getPinnedStream(client)
  await getPins(client)
  await loadStreamFromGateway(gateway, stream.id)
}

async function createStream(context) {
  const tileParams = { content: { hello: 'ceramic' } }
  const docOpts = {
    anchor: true,
    publish: true
  }
  const tile = await TileDoctype.create(
    tileParams,
    context,
    docOpts
  )

  console.log('\n=> tile stream created:', tile.id, tile.state)
  return tile
}

async function updateTileStream(tile) {
  const tileParams = { content: { goodbye: 'ceramic' } }
  const docOpts = {
    anchor: true,
    publish: true
  }
  await tile.change(tileParams, docOpts)
  console.log('\n=> tile stream updated:', tile.id, tile.state)
}

async function loadStreamFromGateway(ceramic, streamId) {
  const stream = await ceramic.loadDocument(streamId)
  console.log('\n=> stream loaded from gateway:', stream.id, stream.state)
}

async function getAnchorStatus(client) {
  const stream = await client.loadDocument(ANCHOR_STATUS_STREAM_ID)
  console.log('\n=> stream loaded from node:', stream.id, stream.state)
}

async function pinStream(client, streamId) {
  let res = await client.pin.add(streamId)
  console.log(res)
  console.log('\n=> stream pinned:', streamId)
}

async function getPinnedStream(client) {
  const stream = await client.loadDocument(PINNED_STREAM_ID)
  console.log('\n=> pinned stream loaded from node:', stream.id, stream.state)
}

async function getPins(client) {
  const pins = await client.pin.ls()
  console.log('\n=> pins:')
  for await (let pin of pins) {
    console.log(pin)
  }
}

main().then(() => {
  console.log('Done')
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
