const { getTextEmbedding, getImageEmbedding } = require('../embedding/embedder');
const MemoryVectorStore = require('../vectorstore/memoryStore');
const fs = require('fs');
const path = require('path');

const vectorStore = new MemoryVectorStore();
const captions = require('../data/captions.json');

async function initializeStore() {
  for (const [filename, caption] of Object.entries(captions)) {
    const embedding = await getTextEmbedding(caption);
    vectorStore.addEmbedding(embedding, { filename, caption });
  }
}

async function searchByText(req, res) {
  const { query } = req.body;
  const embedding = await getTextEmbedding(query);
  const results = vectorStore.search(embedding);
  return res.json(results).end();
}

async function searchByImage(req, res) {
  const file = req.file;
  const imageBuffer = fs.readFileSync(file.path);
  const base64Image = imageBuffer.toString('base64');
  const embedding = await getImageEmbedding(base64Image);
  const results = vectorStore.search(embedding);
  return res.json(results).end();
}

module.exports = { initializeStore, searchByText, searchByImage };