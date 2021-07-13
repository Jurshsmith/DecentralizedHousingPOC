// migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const SolutionAssetVerifier = artifacts.require('SolutionAssetVerifier');
const AssetVerifier = artifacts.require('AssetVerifier');

const DecentralizedHousingToken = artifacts.require("./DecentralizedHousingToken.sol");

module.exports = async (deployer) => {
  await deployer.deploy(AssetVerifier);
  await deployer.deploy(DecentralizedHousingToken);
  await deployer.deploy(SolutionAssetVerifier, AssetVerifier.address);
};
