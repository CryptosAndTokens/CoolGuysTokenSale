pragma solidity ^0.4.18;

/**
 * The contractName contract does this and that...
 */
contract CoolGuyToken {
	// Name 
	string public name = "Cool Guy Token";
	// Symbol
	string public symbol = "GUY";
	// Standard
	string public standard = "Cool Guy Token v1.0";

	//Constructor
	// Set the total number of tokens
	// Read the total number of tokens
	uint256 public totalSupply;

	// listener
	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value);
	

	mapping(address => uint256) public balanceOf;

	constructor (uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
		// allocate the initial supply
	}

	// Transfer Method
	function transfer(address _to, uint256 _value) public returns(bool success) {
		// Transfer exception if value = 0 or invalid
		require(balanceOf[msg.sender] >= _value);
		// Transfer the balance
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		// Return a bool value
		// Transfer Event
		emit Transfer(msg.sender, _to, _value);

		return true;
	}
	
}
