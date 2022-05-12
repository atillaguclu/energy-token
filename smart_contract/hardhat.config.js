// https://eth-ropsten.alchemyapi.io/v2/DTmpldL2yL0OnaMyuPMQ7KNZC2pd3te3

require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/DTmpldL2yL0OnaMyuPMQ7KNZC2pd3te3",
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/qd-iADaS0fwCUAPcX5LlMEZE_qmseJme",
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  }
}