const DecentralizedHousingToken = artifacts.require('DecentralizedHousingToken');

contract('TestERC721Mintable', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    describe('match erc721 spec', function () {
        this.accountOneMinted = 1;
        this.accountTwoMinted = 2;

        beforeEach(async () => {
            this.contract = await DecentralizedHousingToken.new({ from: accountOne });
            // mint multiple tokens

            await this.contract.mint(accountOne, this.accountOneMinted);
            await this.contract.mint(accountTwo, this.accountTwoMinted);
        })

        it('should return total supply', async () => {
            assert.equal(await this.contract.totalSupply.call(), 2, "Total Supply should be 2 since we minted two tokens");
        })

        it('should get token balance', async () => {
            const tokenBalance1 = await this.contract.balanceOf(accountOne);
            assert.equal(tokenBalance1.toNumber(), 1, `Token balance of account 1 should be ${this.accountOneMinted}`);
            const tokenBalance2 = await this.contract.balanceOf(accountOne);
            assert.equal(tokenBalance2.toNumber(), 1, `Token balance of account 2 should be ${this.accountTwoMinted}`);

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async () => {
            const uri = await this.contract.tokenURI.call(1);
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "token URI is incorrect");
        })

        it('should transfer token from one owner to another', async () => {
            await this.contract.transferFrom(accountOne, accountTwo, 1)
            let newOwner = await this.contract.ownerOf.call(1)
            assert.equal(newOwner, accountTwo, "Tokens should be transferrable from an owner to another address")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async () => {
            this.contract = await DecentralizedHousingToken.new({ from: accountOne });
        })

        it('should fail when minting when address is not contract owner', async () => {
            this.revert = false;
            try{
                await this.contract.mint(accountTwo, 3, {from: accountTwo});
            } 
            catch(err) {
                this.revert=true;
            }
            assert.equal(this.revert,true, "transaction should fail");
        })

        it('should return contract owner', async () => {
            assert.equal(await this.contract.getOwner(), accountOne, "Incorrect contract owner");
        })

    });
})