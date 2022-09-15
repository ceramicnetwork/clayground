# Usage

Install with pnpm
```sh
pnpm install
pnpm run build
```

Convert ds key to cid
```sh
DS_KEY=<kubo_datastore_key> node ./out/scripts/ds-key-to-cid.js
```

Convert cid to ds key
```sh
CID=<cid> node ./out/scripts/cid-to-ds-key.js
```

Run with docker
```sh
docker build . -t clayground-app
docker run -e ENV_VAR=<env_var> clayground-app node <path_to_out_file>
```

e.g.
```sh
docker run -e DS_KEY=CIQA5DFMLSDYCII6LCLCE5LKPNE5RJCTPNBQTUI3XIUDURVUADOZ62A \
  clayground-app \
  node ./out/scripts/persistence-check.js
```
