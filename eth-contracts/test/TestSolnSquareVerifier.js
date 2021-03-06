// Test if a new solution can be added for contract - SolutionAssetVerifier
// Test if an ERC721 token can be minted for contract - SolutionAssetVerifier
const SolutionAssetVerifier = artifacts.require('SolutionAssetVerifier');
const AssetVerifier = artifacts.require('AssetVerifier');

const proof = {
  "proof": {
    "a": [
      "0x13285c52f0d7194e658d3a16b0f5db639b7aa9a63f55959143ed2d38a644febb",
      "0x0666b1c476e5b72f5459cde2983f6b573dcf2c76b486a557b2b13d5a3eb68ea1"
    ],
    "b": [
      [
        "0x17f3ecf80bb9b6d01d9da7428ab2741e2331e37d6846468adf68a25e533a8751",
        "0x0f260051f81546c5164416ae809172ed22bc7e3d120496eeeff618df0406bd44"
      ],
      [
        "0x1da73e0947c1160f1a50991d0fe143749a619703eaa57ab587ec2276ae093f9a",
        "0x13bb56a84c8bb2e9223d428f1a1adbfac9612b6dfdd45f9d044e0778902e787d"
      ]
    ],
    "c": [
      "0x0a11879f4b7fa6bb128b0074b4b38950d0b63d0ef503b697d305c528e33afdbb",
      "0x2a09a88ed5e0960c5e30bb9ebba1723772e951d423fb713cc47dfaa6e964b782"
    ]
  },
  "inputs": [
    "0x000000000000000000000000000000000000000000000000000000000000002c",
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ]
};

contract('SolutionAssetVerifier', function (accounts) {

  this.owner = accounts[0];

  before(async () => {
    const assetVerifierAddress = (await AssetVerifier.deployed()).address;
    this.solutionAssetVerifierContract = await SolutionAssetVerifier.new(assetVerifierAddress, { from: this.owner });
  });

  it('a new solution can always be added', async () => {

    const transactionData = await this.solutionAssetVerifierContract.addSolution(
      { from: this.owner }
    );

    const SolutionAddedEvent = transactionData.logs.find((log) => log.event === 'SolutionAdded');

    this.solutionIndex = SolutionAddedEvent.args.index;

    assert.equal(!!SolutionAddedEvent, true, "Solution should have been added with no issues!");
  });

  it('should mint token with verified proof', async () => {

    await this.solutionAssetVerifierContract.mintDecentralizedHousingToken(
      proof.proof.a,
      proof.proof.b,
      proof.proof.c,
      proof.inputs,
      this.solutionIndex,
      { from: this.owner }
    );

    const owner = await this.solutionAssetVerifierContract.ownerOf(this.solutionIndex);

    assert.equal(owner, this.owner, "Minter is not token owner");
  });

});






