# Clayground

Sandbox environment for starting Ceramic ecosystem locally. Components included:

* [ipfs](https://github.com/ceramicnetwork/js-ipfs-daemon) component - IPFS instance with [dag-jose](https://github.com/ceramicnetwork/js-dag-jose) codec enabled
* [ganache](https://www.trufflesuite.com/ganache) - local Ethereum blockchain
* [cas](https://github.com/ceramicnetwork/ceramic-anchor-service) - Typescript Ceramic Anchor Service implementation
* [ceramic](https://github.com/ceramicnetwork/js-ceramic). Typescript Ceramic implementation.

### Prerequisites

In order to use the Clayground you need to install:

* [Docker](https://docs.docker.com/get-docker/)
* [docker-compose](https://docs.docker.com/compose/install/).

### Running

The default Clayground configuration is stored in `.env` file.

Starting all the components in local:

```docker-compose up -d```

Clayground has local CLI script which connects to deployed Ceramic instance.

For example, creating a tile:
```shell script
./bin/ceramic.sh create tile '{"hello": "ceramic"}'
```

### Component storage

Clayground stores component data in `./data` directory.

Local Ceramic CLI data is stored in `./data/local`.

#### Deleting component storage

There is a utility script `./bin/rmstore.sh` which cleans up components store.

For example:
```shell script
./bin/rmstore.sh cas
```

## Maintainers
[@simonovic86](https://github.com/simonovic86)

## License

Apache-2.0 OR MIT

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fceramicnetwork%2Fclayground.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fceramicnetwork%2Fclayground?ref=badge_large)

## Team

Built with  <img src="./resources/heart.png" width="20"/> from [3Box](https://3box.io) team.
