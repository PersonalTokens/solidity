# Personal Tokens's Smart Contracts [![Build Status](https://travis-ci.org/PersonalTokens/solidity.svg?branch=master)](https://travis-ci.org/PersonalTokens/solidity)

This repository hosts source code of on-chain part of [Personal Tokens](https://personaltokens.io).
All smart contracts are located in the contracts folder.

## Development

Requirements:

 * [Node.js](https://nodejs.org/en/)
 * [git](https://git-scm.com/download/)

Setup:

 1. install truffle: `npm install -g truffle`
 2. clone the repository: `git clone https://github.com/PersonalTokens/solidity.git`
 3. change into the root directory: `cd solidity`
 4. install all Node.js requirements from package.json: `npm install`

### Migrating and testing with truffle develop

 * run: `truffle develop`
 * compile: `compile`
 * migrate: `migrate`
 * run tests: `test`

## Contracts

Token contracts are based on [OpenZeppelin framework](https://github.com/OpenZeppelin/openzeppelin-solidity).

### Contract `PersonalToken`

ERC20 compatible token contract, see [wiki for documentation](https://theethereum.wiki/w/index.php/ERC20_Token_Standard).
Used for creation of Personal Tokens by the users of the platform.

### Contract `PersonToken`

ERC20 compatible token contract, see [wiki for documentation](https://theethereum.wiki/w/index.php/ERC20_Token_Standard).
Used by PERSON, utility token which is used on the platform to pay for additional services but It also gives holders ability to withdraw personal tokens from the PERSON FUND.

## About Personal Tokens

[Personal Tokens](https://personaltokens.io) is a platform where you can easily verify and tokenize yourself. We are building an infrastructure for the new emerging economy based on privately issued tokens backed with real people. Using an incentive structure build into tokens we incentivise people to build the value of their own tokens.
We are aiming to build a robust and decentralized platform as possible. Our goal is to deliver as many tools as tokenized people need and to make the token economy as user friendly as possible.

## License

    Copyright (c) 2018 - 2019 Trifinity.io

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
