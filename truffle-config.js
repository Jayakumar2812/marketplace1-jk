const HDWalletProvider = require("@truffle/hdwallet-provider")
const keys = require("./keys.json")
module.exports = {
  contracts_build_directory:"./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",    
     port: 7545,           
     network_id: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `https://ropsten.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex:0
        }),
      network_id: '3',
      gas:5500000, // gas limit
      gasPrice:90000000000, // gas price per uint 
      confirmations:2,
      timeoutBlocks:200,
    }
    },
  compilers: {
    solc: {
      version: "0.8.10",
    }
  }

}
// contract address - 0xb45753C33Ffd0ab0B85C54eF10c096D1dc2Ac07C