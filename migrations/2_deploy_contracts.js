var CoolGuyToken = artifacts.require("./CoolGuyToken.sol");
var CoolGuyTokenSale = artifacts.require("./CoolGuyTokenSale.sol")

module.exports = function(deployer) {
  deployer.deploy(CoolGuyToken, 1000000).then(function(){
  	// Token price is 0.001 Ether
  	var tokenPrice = 1000000000000000 // in wei
  	return deployer.deploy(CoolGuyTokenSale, CoolGuyToken.address, tokenPrice);
  });
};
