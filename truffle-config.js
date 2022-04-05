require('dotenv').config();
const privatekeys= process.env.PRIVATE_KEYS || "";
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "work blanket spider opinion lumber busy write snack road leader curious smoke"
module.exports = {
  
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
    
    kovan: {
      provider: function() {
        return new HDWalletProvider(
        privatekeys.split(','),
        `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      network_id:42,
      gas: 5000000,
      gasPrice:25000000000
     
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",
       optimizer: {
         enabled: false,
         runs: 200
       }
    }
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/'
  
};
