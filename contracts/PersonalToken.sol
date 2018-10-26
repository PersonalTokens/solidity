pragma solidity ^0.4.18;

import "./OpenZeppelin/StandardToken.sol";

/**
 * @title PersonalToken
 * @dev Personal Token contract.
 */
contract PersonalToken is StandardToken {
  string public name = "Token name";
  string public symbol = "SYMBOL";
  uint8 public constant decimals = 4;

  /**
   * @dev Mints all tokens to given accounts.
   */
  function PersonalToken(string _name, string _symbol, address _keeper, address _treasurer) public {
    name = _name;
    symbol = _symbol;
    totalSupply_ = 210000000000;

    uint256 deposit = 2100000000;

    balances[_keeper] = deposit;
    balances[_treasurer] = (totalSupply_ - deposit);

    emit Transfer(address(0), _keeper, deposit);
    emit Transfer(address(0), _treasurer, (totalSupply_ - deposit));
  }
}
