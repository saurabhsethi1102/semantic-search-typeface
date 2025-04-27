const cosineSimilarity = (vecA, vecB) => {
    const dot = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dot / (magA * magB);
  };
  
  class MemoryVectorStore {
    constructor() {
      this.items = [];
    }
  
    addEmbedding(embedding, metadata) {
      this.items.push({ embedding, metadata });
    }
  
    search(embedding, k = 5) {
      const results = this.items.map(item => ({
        similarity: cosineSimilarity(item.embedding, embedding),
        metadata: item.metadata
      }));
      return results.sort((a, b) => b.similarity - a.similarity).slice(0, k);
    }
  }
  
module.exports = MemoryVectorStore;