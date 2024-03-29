const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/')


// const account = web3.eth.accounts[0];
// console('account : ' + account);
// web3.etth.getBalance(account, (error, balance) => {
//    if (!error)
//         console.log('getBalance:' + balance);
// }


const account1 = '' // Your account address 1
const account2 = '' // Your account address 2

console.log('account1:', account1)
console.log('account2:', account2)

const privateKey1 = Buffer.from('', 'hex')
const privateKey2 = Buffer.from('YOUR_PRIVATE_KEY_2', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('1.0', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  console.log('account2:', account2)

  // Sign the transaction
  //const tx = new Tx(txObject)
  const tx = new Tx(txObject, { 'chain': 'ropsten' })
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
