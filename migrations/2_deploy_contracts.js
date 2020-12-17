//IMPORT SMART CONTRACT
const Meadow = artifacts.require("Meadow");

module.exports = function (deployer) {
  deployer.deploy(Meadow);
};
