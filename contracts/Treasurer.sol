pragma solidity ^0.4.18;

import "./TreasurerWallet.sol";
import "./OpenZeppelin/SignatureBouncer.sol";

/**
 * @title Treasurer
 * @dev Contract that manages tokens
 */
contract Treasurer is SignatureBouncer {
  mapping(address => mapping(bytes => bool)) private withdrawals;
  address private wallet;

  event Withdrawal(address token, address to, uint256 value, bytes signature);

/**
 * @dev Sets signer address.
 */
  function Treasurer(address _wallet, address _signer) public {
    wallet = _wallet;

    addBouncer(_signer);
  }

/**
 * @dev Allows to withdraw limited amount of tokens by bearer of valid key.
 */
  function withdraw(ERC20Basic _token, address _to, uint256 _value, uint _timestamp, bytes _signature) public onlyValidSignatureAndData(_signature) {
    require(_value > 0);
    require(!withdrawals[_token][_signature]);

    if ((_timestamp < (block.timestamp - 1 hours)) || (_timestamp > (block.timestamp + 1 hours))) {
      revert();
    }

    withdrawals[_token][_signature] = true;

    TreasurerWallet(wallet).withdraw(_token, _to, _value);

    emit Withdrawal(_token, _to, _value, _signature);
  }
}
