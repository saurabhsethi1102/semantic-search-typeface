const axios = require('axios');
require('dotenv').config();
const { OPENAI_ENDPOINT, OPENAI_API_KEY, OPENAI_DEPLOYMENT_NAME } = process.env;


async function getTextEmbedding(text) {
  const response = await axios.post(`${OPENAI_ENDPOINT}/openai/deployments/${OPENAI_DEPLOYMENT_NAME}/embeddings?api-version=2023-03-15-preview`, {
    input: text,
    model: "text-embedding-ada-002"
  }, {
    headers: {
      "api-key": OPENAI_API_KEY
    }
  });
  return response.data.data[0].embedding;
}

async function getImageEmbedding(base64Image) {
  const simulatedText = "photo of " + Math.random().toString(36).substring(7);
  return getTextEmbedding(simulatedText);
}

module.exports = { getTextEmbedding, getImageEmbedding };