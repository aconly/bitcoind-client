const Client = require("bitcoin-core")
const sha256 = require('crypto-js/sha256')

class Blockchain {
  constructor(configuration) {
    this.client = new Client(configuration)
  }

  async createTransaction(data) {
    try {
      const listUnspent = await this.client.listUnspent()
      const unspent = listUnspent[0]
      if (unspent) {
        const address = unspent.address
        const inputs = [{ txid: unspent.txid, vout: unspent.vout }]
        const dataSha256 = sha256(data).toString();
        const outputs = { data: dataSha256, [address]: 0 }
        const RawTx = await this.client.createRawTransaction(inputs, outputs)
        const tx = await this.client.signRawTransaction(RawTx)
        return tx.hex
      }
      throw new Error('There are not unspents, if are using regtest please generate some BTCs for test, :)')
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async broadcast(txHex) {
    return await this.client.sendRawTransaction(txHex, true)
  }

  async getRawTransaction(txHash) {
    return await this.client.getRawTransaction(txHash, true)
  }
}

module.exports = Blockchain
