# Clayground

Sandbox environment for starting Ceramic ecosystem locally. Components included:

* [ipfs](https://github.com/ceramicnetwork/js-ipfs-daemon) - IPFS instance with [dag-jose](https://github.com/ceramicnetwork/js-dag-jose) codec enabled
* [ganache](https://www.trufflesuite.com/ganache) - local Ethereum blockchain
* [cas](https://github.com/ceramicnetwork/ceramic-anchor-service) - Typescript Ceramic Anchor Service implementation
* [ceramic](https://github.com/ceramicnetwork/js-ceramic). Typescript Ceramic implementation.

### Prerequisites

In order to use the Clayground you need to install:

* [Docker](https://docs.docker.com/get-docker/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [Node.js - v14.9.0](https://nodejs.org)
* [TypeScript - v3.8.3](https://www.typescriptlang.org).

### Running

The default Clayground configuration is stored in `.env` file.

Starting all the components locally in a synchronous manner:

```shell script
docker-compose up
```

For more `docker-compose` options and start configuration visit the [official documentation](https://docs.docker.com/compose/reference/overview/).

In order to test Clayground sandbox you need to build `js-ceramic` component:

```shell script
./bin/build-ceramic.sh
```

When build has been completed, use `ceramic.sh` for executing commands. 

For example, creating a tile:
```shell script
./bin/ceramic.sh create tile --content '{"hello": "ceramic"}'
```

Of course, Ceramic CLI can always be installed from [npm](https://www.npmjs.com/package/@ceramicnetwork/ceramic-cli).

### Component storage

Clayground stores component data in `./data` directory.

Local Ceramic CLI data is stored in `./data/local`.

#### Deleting component storage

There is a utility script `./bin/rmstore.sh` which cleans up components store.

For example:
```shell script
./bin/rmstore.sh cas
```

### Docker utilities

There is a utility script `./bin/docker-destroy-all.sh` which removes **ALL** docker containers and images.

For example:
```shell script
./bin/docker-destroy-all.sh
```

## Maintainers
[@simonovic86](https://github.com/simonovic86)

## License

Apache-2.0 OR MIT

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fceramicnetwork%2Fclayground.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fceramicnetwork%2Fclayground?ref=badge_large)

## Team

Built with  <img src="./resources/heart.png" width="20"/> from [3Box](https://3box.io) team.
