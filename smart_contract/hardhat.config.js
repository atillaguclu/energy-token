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
      accounts: ["570dfadfe7b84923ab330f43b2684521ce8f7143d86ec0b6810c9c0d561164c3"]
    }
  }
}