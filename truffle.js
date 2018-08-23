require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    mainnet: {
      provider: function() {
        return new HDWalletProvider(process.env.OWNER_MNEMONIC, `https://mainnet.infura.io/${process.env.MAINNET_INFURA_API_KEY}`, 0);
      },
      network_id: 1
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.OWNER_MNEMONIC, `https://rinkeby.infura.io/${process.env.RINKEBY_INFURA_API_KEY}`, 0);
      },
      network_id: 4
    },
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    }
  }
};
