const PersonalToken = artifacts.require('PersonalToken');

contract('PersonalToken', function(accounts) {
  it('check name of PersonalToken', async() => {
    const instance = await PersonalToken.deployed();

    assert.equal((await instance.name.call()).toString(), 'TestToken', 'Name is different than TestToken');
  });
  it('check symbol of PersonalToken', async() => {
    const instance = await PersonalToken.deployed();

    assert.equal((await instance.symbol.call()).toString(), 'TST', 'Symbol is different than TST');
  });
  it('check total supply of PersonalToken', async() => {
    const instance = await PersonalToken.deployed();

    assert.equal((await instance.totalSupply.call()).toNumber(), 210000000000, 'Total supply is different than 210000000000');
  });
  it('check decimals of PersonalToken', async() => {
    const instance = await PersonalToken.deployed();

    assert.equal((await instance.decimals.call()).toNumber(), 4, 'Decimals is different than 4');
  });
  it('check keeper deposit', async() => {
    const instance = await PersonalToken.deployed();

    assert.equal((await instance.balanceOf.call(accounts[0])).toNumber(), 2100000000, 'Keeper deposit is different than 2100000000');
  });
  it('check treasurer deposit', async() => {
    const instance = await PersonalToken.deployed();

    assert.equal((await instance.balanceOf.call(accounts[1])).toNumber(), 207900000000, 'Treasurer deposit is different than 207900000000');
  });
  it('check total supply of PersonalToken after burning tokens', async() => {
    const instance = await PersonalToken.deployed();

    await instance.burn('2100000000');

    assert.equal((await instance.totalSupply.call()).toNumber(), 207900000000, 'Total supply is different than 207900000000');
  });
});
