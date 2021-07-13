pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
import "./AssetVerifier.sol";

// define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// define a solutions struct that can hold an index & an address
// define an array of the above struct
// define a mapping to store unique solutions submitted
// Create an event to emit when a solution is added
// Create a function to add the solutions to the array and emit the event
// Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
contract SolutionAssetVerifier is DecentralizedHousingToken {
    struct Solution {
        uint256 index;
        address owner;
    }
    Solution[] private solutions;
    mapping(bytes32 => bool) uniqueSolutions;
    event SolutionAdded(uint256 index, address owner);
    AssetVerifier private assetVerifier;

    constructor(address assetVerifierContractAddress) public {
        assetVerifier = AssetVerifier(assetVerifierContractAddress);
    }

    function addSolution(uint256[2] memory input) public {
        Solution memory newSolution = Solution(solutions.length, msg.sender);

        solutions.push(newSolution);

        emit SolutionAdded(newSolution.index, newSolution.owner);
    }

    function mintDecentralizedHousingToken(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input,
        uint256 index
    ) public {
        bytes32 hashByte = keccak256(abi.encodePacked(input[0], input[1]));

        require(solutions[index].owner == msg.sender, "Requires solution oner");
        require(assetVerifier.verifyTx(a, b, c, input), "Invalid Solution");

        require(!uniqueSolutions[hashByte], "Repeated solution");

        mint(msg.sender, index);

        uniqueSolutions[hashByte] = true;
    }
}
