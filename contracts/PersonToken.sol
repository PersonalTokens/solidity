pragma solidity 0.5.3;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/**
* @title PersonToken
* @dev Person Token contract.
*/
contract PersonToken is ERC20Burnable, ERC20Detailed {
 /**
  * @dev Mints all tokens to creator account.
  */
 constructor() public ERC20Detailed("Personal Tokens pool", "PERSON", 18) {
   _mint(msg.sender, 10000000000000000000000000000);
 }
}
