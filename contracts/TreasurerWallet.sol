pragma solidity ^0.4.18;

import "./OpenZeppelin/ERC20Basic.sol";
import "./OpenZeppelin/Ownable.sol";

/**
 * @title TreasurerWallet
 * @dev Contract that keeps tokens
 */
contract TreasurerWallet is Ownable {
  address public treasurer;
  bool public isLocked = false;

  event Withdrawal(address token, address to, uint256 value);

/**
 * @dev Throws if called by any account other than the treasurer.
 */
  modifier onlyTreasurer() {
    require(msg.sender == treasurer);
    _;
  }

/**
 * @dev Sets address of treasurer.
 */
  function setTreasurer(address _treasurer) public onlyOwner {
    treasurer = _treasurer;
  }

/**
 * @dev Allows to migrate tokens to new wallet address.
 */
  function migrate(address _wallet, ERC20Basic[] _tokens) public onlyOwner {
     isLocked = true;

    for (uint256 i = 0; i < _tokens.length; ++i) {
      _tokens[i].transfer(_wallet, _tokens[i].balanceOf(this));
    }
  }

/**
 * @dev Allows to withdraw limited amount of tokens by treasurer.
 */
  function withdraw(ERC20Basic _token, address _to, uint256 _value) public onlyTreasurer {
    require(_value > 0);
    require(!isLocked);

    _token.transfer(_to, _value);

     emit Withdrawal(_token, _to, _value);
  }
}
