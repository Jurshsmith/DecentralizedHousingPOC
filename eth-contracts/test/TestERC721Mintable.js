const DecentralizedHousingToken = artifacts.require('DecentralizedHousingToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async () => { 
            this.contract = await DecentralizedHousingToken.new({from: account_one});
            // mint multiple tokens
            await this.contract.mint(account_one, 1);
            await this.contract.mint(account_two, 2);
        })

        it('should return total supply', async () => { 
            assert.equal(totalSupply.toNumber(), await this.contract.totalSupply.call(), "Total Supply should be 2");
        })

        it('should get token balance', async () => { 
            const tokenBalance1 = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance1.toNumber(), 1, "Token balance of account 1 is incorrect");
            const tokenBalance2 = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance2.toNumber(), 1, "Token balance of account 2 is incorrect");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async () => { 
            const uri = await this.contract.tokenURI.call(1);
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "token URI is incorrect");
        })

        it('should transfer token from one owner to another', async () => { 
            await this.contract.transferFrom(account_one, account_two, 1)
            let newOwner = await this.contract.ownerOf.call(1)
            assert.equal(newOwner, account_two, "Token failed to transfer")    
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async () => { 
            this.contract = await DecentralizedHousingToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async () => { 
            
        })

        it('should return contract owner', async () => { 
            
        })

    });
})