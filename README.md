## How to run

First of all we need to create 'contract owner' address:
1. Go to https://iancoleman.io/bip39
2. Select '12 words', coin ETH and click 'Generate' button
3. Copy 'BIP39 Mnemonic' value
4. Set variable MNEMONIC in '.env' file

Also we need to specify beneficiary address:
- Set variable BENEFICIARY_ADDRESS in '.env' file (can be generated via https://www.myetherwallet.com)

We should install local private ethereum blockchain for testing purposes
Let's install ganache:
https://github.com/trufflesuite/ganache/releases

Install truffle globally:
> npm i truffle -g

Install project dependencies (must be run from project directory):
> npm i

Now we can deploy our smart contract (must be run from project directory):
> truffle migrate

Also we can specify network for deploying:
> truffle migrate --network <network_id>

Where 'network_id' is name of ethereum network where we want to deploy our contracts.

Available ids: mainnet, rinkeby, development.

Development network use as default.
