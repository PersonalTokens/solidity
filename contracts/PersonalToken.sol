pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title PersonalToken
 * @dev Personal Token contract.
 */
contract PersonalToken is ERC20, ERC20Detailed {
  /**
   * @dev Mints all tokens to given accounts.
   */
  constructor(string _name, string _symbol, address _keeper, address _treasurer) public ERC20Detailed(_name, _symbol, 4) {
    uint256 totalSupply = 210000000000;
    uint256 deposit = 2100000000;

    _mint(_keeper, deposit);
    _mint(_treasurer, (totalSupply - deposit));
  }
}
