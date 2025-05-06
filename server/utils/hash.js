function customHash(str) {
    let hash = 0n;
  
    for (let i = 0; i < str.length; i++) {
      const charCode = BigInt(str.charCodeAt(i));
      hash ^= (charCode << BigInt(i)) + BigInt(31) * hash;
    }
  
    return (hash & BigInt("0xFFFFFFFFFFFFFFFF")).toString(16); // 64-bit hex
  }
  
  module.exports = customHash;
  