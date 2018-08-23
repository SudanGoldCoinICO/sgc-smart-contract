First of all we need to create 'contract owner' address:
1. Go to https://iancoleman.io/bip39
2. Select '12 words', coin ETH and click 'Generate' button
3. Copy 'BIP39 Mnemonic' value
4. Set variable MNEMONIC in '.env' file

Also we need to specify beneficiary address:
- Set variable BENEFICIARY_ADDRESS in '.env' file (can be generated via https://www.myetherwallet.com)


Now we can deploy our smart contract:
>> truffle migrate --network <network_id>

Where 'network_id' is name of ethereum network where you want to deploy your contract.
Available ids: mainnet, rinkeby, development.
