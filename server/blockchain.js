const fs = require("fs");
const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const blockString = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash;
    return crypto.createHash("sha256").update(blockString).digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = this.loadChain();
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), "Genesis Block", "0");
  }

  loadChain() {
    try {
      const data = fs.readFileSync("blockchain.json");
      const parsedData = JSON.parse(data);
      // Ensure each block is properly instantiated as a Block object
      return parsedData.map(blockData => new Block(blockData.index, blockData.timestamp, blockData.data, blockData.previousHash));
    } catch (error) {
      console.log("No blockchain file found, creating new one...");
      return [this.createGenesisBlock()];
    }
  }

  saveChain() {
    fs.writeFileSync("blockchain.json", JSON.stringify(this.chain, null, 2));
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newData) {
    const prevBlock = this.getLatestBlock();
    const newBlock = new Block(
      prevBlock.index + 1,
      Date.now().toString(),
      newData,
      prevBlock.hash
    );
    this.chain.push(newBlock);
    this.saveChain();
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      if (curr.hash !== curr.calculateHash()) return false;
      if (curr.previousHash !== prev.hash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
