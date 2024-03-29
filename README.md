# Clayground

Sandbox environment for starting Ceramic ecosystem locally. Components included:

* [Ceramic](https://github.com/ceramicnetwork/js-ceramic) - Typescript implementation of Ceramic
* [CAS](https://github.com/ceramicnetwork/ceramic-anchor-service) - Typescript implementation of Ceramic Anchor Service
* [IPFS](https://github.com/ceramicnetwork/js-ceramic/tree/develop/packages/ipfs-daemon) - IPFS daemon with [dag-jose](https://github.com/ceramicnetwork/js-dag-jose) codec enabled
* [Ganache](https://www.trufflesuite.com/ganache) - Local Ethereum blockchain

### Prerequisites

In order to use the Clayground you need to install:

* [Docker](https://docs.docker.com/get-docker/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [Node.js - v14](https://nodejs.org)
* [TypeScript](https://www.typescriptlang.org)

### Running

The default Clayground configuration is stored in `.env` file.

Starting all the components locally in a synchronous manner:

```shell script
docker-compose up
```

Pass in other configuration files with the `--env-file` flag:

```shell script
docker-compose --env-file .env.dev-unstable up
```

For more `docker-compose` options and start configuration visit the [official documentation](https://docs.docker.com/compose/reference/overview/).

**Performance testing**

To start performance testing one has to run additional `benchie` service:
```shell
docker-compose -f docker-compose.yml -f docker-compose.benchie.yml up
```

It will immediately start performance testing suite with all the tests.

### Execute commands

First get the container ID for js-ceramic:
```shell script
docker ps
```

Then run Ceramic commands with `docker exec`. For example, creating a tile:
```shell script
docker exec <container_id> packages/cli/bin/ceramic.js create tile --content '{"hello": "ceramic"}'
```

### Component storage

Clayground stores component data in the current directory under `./data`.

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
[@v-stickykeys](https://github.com/v-stickykeys)

## License

Apache-2.0 OR MIT

## Team

Built with ❤️ by the [3Box Labs](https://3boxlabs.com) team.
