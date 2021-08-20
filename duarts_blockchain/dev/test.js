const Blockchain = require('./blockchain.js')

//Makes a new instance of our Blockchain data structure,
const bearcoin = new Blockchain();
//console.log(bearcoin);


//------------------------
// Blocks and Transactions
//------------------------
//Remember .createNewBlock() needs these 3 parameters: nonce, previousBlockHash, hash
bearcoin.createNewBlock(12345, 'asdfghjkl','zxcvbnm');
bearcoin.createNewBlock(23456, 'poiuytrewq','lkjhgfdsa');
bearcoin.createNewBlock(34567, 'mnbvcxz','zlamsicn');

//Create a new Transaction.
bearcoin.createNewTransaction(100,'SENDER0001','RECIVER00001');
bearcoin.createNewTransaction(100,'SENDER0002','RECIVER00002');

//Print whole Chain of blocks.
console.log(bearcoin);

//Print only last block.
//console.log(bearcoin.getLastBlock())

//---------
// Hashing
//---------

//Data for making a Hash.
const previousBlockHash = 'A9089AUD8A8UA8GSDA';
const currentBlockData = [{
  "amount": 50,
  "sender": "ALEX00IIO99GHAHBA1",
  "recipient": "RODRIGOOOIJOI9ABAABAS1",
},
{
  "amount": 150,
  "sender": "ALEX00IIO99GHAHBA2",
  "recipient": "RODRIGOOOIJOI9ABAABAS2",
},
{
  "amount": 5,
  "sender": "ALEX00IIO99GHAHBA3",
  "recipient": "RODRIGOOOIJOI9ABAABAS3",
}
];
//const nonce = 100;
//hash = bearcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
//console.log(hash);

console.log("-----------------------");

//--------------
// Proof of Work
//--------------

//We test our proofOfWork.
let nonce = bearcoin.proofOfWork(previousBlockHash,currentBlockData);
console.log("Nonce: " + nonce);

//Once we get our Nonce, we create our hash.
let hash = bearcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
console.log("Hash: " + hash);