//Blockchain
//This file is our blockchain data structure.

//Sha256 function library.
const sha256 = require('js-sha256');

function Blockchain(){
  //Initialize the chain to an empty array. We will store all of our blocks here.
  this.chain = [];
  //Hold  all the new transactions before they are mined into a block.
  this.newTransactions = [];

  //Genesis Block.
  this.createNewBlock(100, "0","0");
};

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
  const newBlock = {
    //Number of Block in our chain.
    index: this.chain.length + 1,
    //Time the block was created.
    timestamp: Date.now(),
    //All of the transactions in this block.
    transactions: this.newTransactions,
    //Number used only once. This is the proof that we actually created a legit block.
    nonce:nonce,
    //Data from our new block.
    hash:hash,
    //Data from our current blck hashed into a string.
    previousBlockHash: previousBlockHash
  };

  //Clears out any new transactions.
  this.newTransactions = [];
  //Add the new Block to the chain.
  this.chain.push(newBlock);

  return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
  return this.chain[this.chain.length-1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
  //Create a new Transaction object.
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient
  };

  //Add the new Transaction to the newTransactions array.
  this.newTransactions.push(newTransaction);

  //Get the index for the last block, and return it.
  return this.getLastBlock()['index']+1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
  //This function takes the blockData and return the hash result.

  //Concatenate all our data in a String.
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  //Hash our data string.
  const hash = sha256(dataAsString);
  return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
  let nonce = 0;

  //Creates first Hash.
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

  //Business Rule or Difficulty Level: We repeat the Hash, until it starts with '0000';
  while(hash.substring(0,4) !== '0000'){
    //We increment the nonce, until we satisfies the condition Business Rule or Difficulty Level.
    nonce ++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }

  return nonce;
}

module.exports = Blockchain;