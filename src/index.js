const Blockchain = require('./Blockchain')

const main = async () => {
  try {
    
    const blockchain = new Blockchain({
      port: 8332,
      username: "user",
      password: "password"
    })
    const data = 'Test send data'
    const txHex = await blockchain.createTransaction(data)
    const txHash = await blockchain.broadcast(txHex)
    const rawTransaction = await blockchain.getRawTransaction(txHash)

    console.log('----------------- Tx Hash -----------------')
    console.log(txHash)
    console.log('--------------- Transaction ---------------')
    console.log(JSON.stringify(rawTransaction, null, 2))
  } catch(e) {
    console.log('e ',e)
  }
}

main()

