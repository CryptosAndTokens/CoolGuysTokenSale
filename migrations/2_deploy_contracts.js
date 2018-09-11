var CoolGuyToken = artifacts.require("./CoolGuyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CoolGuyToken, 1000000);
};
