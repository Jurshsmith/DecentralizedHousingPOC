// migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const DecentralizedHousingToken = artifacts.require("./DecentralizedHousingToken.sol");

module.exports = async (deployer) => {
  // deployer.deploy(SquareVerifier);
  // deployer.deploy(SolnSquareVerifier);

  await deployer.deploy(DecentralizedHousingToken);

};
