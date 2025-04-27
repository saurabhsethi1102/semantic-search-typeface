const express = require('express');
const multer = require('multer');
const { initializeStore, searchByText, searchByImage } = require('./controllers/search');

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/search-text', searchByText);
app.post('/search-image', upload.single('image'), searchByImage);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  await initializeStore();
  console.log('Vector store initialized.');
});