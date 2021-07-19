const SolutionAssetVerifier = require('./build/contracts/SolutionAssetVerifier.json');
const Web3 = require('web3');
require('dotenv').config({ path: '../.env' });
const { INFURA_KEY, MNEMONIC, PUBLIC_KEY, PUBLIC_KEY_1, CONTRACT_ADDRESS } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");

const noOfTokensToMint = 9;

async function main() {

  const provider = new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_KEY}`, 0, 20);

  const web3 = new Web3(provider);

  const SolutionAssetVerifierContract = new web3.eth.Contract(SolutionAssetVerifier.abi, CONTRACT_ADDRESS);

  const rawTransactions = await Promise.allSettled(
    new Array(noOfTokensToMint).fill(0).map((_, indexAsTokenId) => SolutionAssetVerifierContract.methods.mint(PUBLIC_KEY, indexAsTokenId).send({ from: PUBLIC_KEY }))
  );

  console.log({ rawTransactions })

  console.log(`Successfully Minted ${noOfTokensToMint} tokens`);

  provider.engine.stop();

}


main();