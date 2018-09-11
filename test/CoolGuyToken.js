var CoolGuyToken = artifacts.require("./CoolGuyToken.sol");

//Unit testing for contract to be called from node.js environment
contract("CoolGuyToken", function(accounts){
	var tokenInstance; // Object variable for token instance passed from constructor

	// asynchronous code. Adding callbacks (done) 
	//until the function testing is complete
	it('initializes the contract with the correct values', function(){
		return CoolGuyToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'Cool Guy Token', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, "GUY");
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'Cool Guy Token v1.0', 'token has the correct standard');
		});
	})

	it('allocates the initial supply upon deployment', function(){
		return CoolGuyToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account');
		});
	});

	// Checking balances... Our initial value is 1,000,000 to add/substract
	it('transfers token ownership', function(){
		return CoolGuyToken.deployed().then(function(instance){
			tokenInstance = instance;
			// Test 'require' statement first by transferring something larger than the sender's balance
			return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);	
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 550000, { from: accounts[0] });
		}).then(function(success) {
			assert.equal(success, true, 'it return true');
			return tokenInstance.transfer(accounts[1], 550000, { from: accounts[0] });
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
			assert.equal(receipt.logs[0].args._value, 550000, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);			
		}).then(function(balance){
			assert.equal(balance.toNumber(), 550000, 'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 450000, 'deducts the amount from the sending account');
		})
	});

})