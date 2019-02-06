pragma solidity 0.5.3;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title PersonalToken
 * @dev Personal Token contract.
 */
contract PersonalToken is ERC20Burnable, ERC20Detailed {
  /**
   * @dev Mints all tokens to given accounts.
   * @param name Name of the token.
   * @param symbol Symbol of the token.
   * @param keeper Address of the keeper.
   * @param treasurer Address of the treasurer.
   */
  constructor(string memory name, string memory symbol, address keeper, address treasurer) public ERC20Detailed(name, symbol, 4) {
    uint256 totalSupply = 210000000000;
    uint256 deposit = 2100000000;

    _mint(keeper, deposit);
    _mint(treasurer, (totalSupply - deposit));
  }
}
