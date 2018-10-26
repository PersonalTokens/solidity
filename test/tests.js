const { soliditySha3 } = require('web3-utils');
const secp256k1 = require('secp256k1');

var PersonalToken = artifacts.require('PersonalToken');
var Treasurer = artifacts.require('Treasurer');
var TreasurerWallet = artifacts.require('TreasurerWallet');
const signerAddress = '0x364EfCFda56BfA9005AcFc4c14ea9bE002c59f7D';
const signerKey = '0x0ca3d1fe286dfac3497a7888041388fff6c65eab58f9e8dfa5068652e7ab8153';

function signWithdrawal(contract, redeemerAddress, tokenAddress, beneficiaryAddress, value) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.round(Date.now() / 1000);
    const parameters = [tokenAddress, beneficiaryAddress, value, timestamp, `0x${web3.padLeft('', (2 * 65))}`];
    const hash = soliditySha3('\x19Ethereum Signed Message:\n32', soliditySha3(contract.address, redeemerAddress, contract.contract.withdraw.getData(...parameters).slice(0, -(2 * 96))));
    const signature = secp256k1.sign(Buffer.from(hash.substring(2), 'hex'), Buffer.from(signerKey.substring(2), 'hex'));

    resolve({
      signature: '0x' + signature.signature.toString('hex') + (signature.recovery + 27).toString(16),
      timestamp: timestamp
    });
  });
}

contract('PersonalToken', function(accounts) {
  it('check name of PersonalToken', function() {
    return PersonalToken.deployed().then(function(instance) {
      return instance.name.call();
    }).then(function(name) {
      assert.equal(name, 'TestToken', 'Name is different than TestToken');
    });
  });
  it('check symbol of PersonalToken', function() {
    return PersonalToken.deployed().then(function(instance) {
      return instance.symbol.call();
    }).then(function(name) {
      assert.equal(name, 'TST', 'Symbol is different than TST');
    });
  });
  it('check total supply of PersonalToken', function() {
    return PersonalToken.deployed().then(function(instance) {
      return instance.totalSupply.call();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.valueOf(), 210000000000, 'Total supply is different than 210000000000');
    });
  });
  it('check decimals of PersonalToken', function() {
    return PersonalToken.deployed().then(function(instance) {
      return instance.decimals.call();
    }).then(function(decimals) {
      assert.equal(decimals.valueOf(), 4, 'Decimals is different than 4');
    });
  });
  it('check TreasurerWallet deposit', function() {
    return PersonalToken.deployed().then(function(instance) {
      return instance.balanceOf.call(TreasurerWallet.address);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 207900000000, 'TreasurerWallet deposit is different than 207900000000');
    });
  });
  it('check keeper deposit', function() {
    return PersonalToken.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 2100000000, 'Keeper deposit is different than 2100000000');
    });
  });
});

contract('Treasurer', function(accounts) {
  it('check withdrawal', function() {
    let signingResult = {};
    let treasurerInstance = {};

    return Treasurer.deployed().then(function(instance) {
      treasurerInstance = instance;

      return signWithdrawal(instance, accounts[0], PersonalToken.address, accounts[1], 10).then(function(result) {
        signingResult = result;

        return treasurerInstance.withdraw(PersonalToken.address, accounts[1], 10, signingResult.timestamp, signingResult.signature).then(function() {
          return PersonalToken.deployed().then(function(instance) {
            return instance.balanceOf.call(accounts[1]);
          }).then(function(balance) {
            assert.equal(balance.valueOf(), 10, 'Withdrawn value is different than 10');
          });
        });
      })
    });
  });
});

contract('TreasurerWallet', function(accounts) {
  it('check owner', function() {
    return TreasurerWallet.deployed().then(function(instance) {
      return instance.owner.call();
    }).then(function(address) {
      assert.equal(address, accounts[0], 'Owner is different than ' + accounts[0]);
    });
  });
  it('check treasurer', function() {
    return TreasurerWallet.deployed().then(function(instance) {
      return instance.treasurer.call();
    }).then(function(address) {
      assert.equal(address, Treasurer.address, 'Treasurer is different than ' + Treasurer.address);
    });
  });
  it('check migration', function() {
    return TreasurerWallet.deployed().then(function(instance) {
      return instance.migrate(accounts[2], [PersonalToken.address]);
    }).then(function() {
      return PersonalToken.deployed().then(function(instance) {
        return instance.balanceOf.call(accounts[2]);
      }).then(function(balance) {
        assert.equal(balance.valueOf(), 207900000000, 'New wallet balance is different than 207900000000');
      });
    });
  });
  it('check lock state', function() {
    return TreasurerWallet.deployed().then(function(instance) {
      return instance.isLocked.call();
    }).then(function(state) {
      assert.equal(state, true, 'TreasurerWallet is not locked');
    });
  });
});
