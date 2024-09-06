const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const getData = (file) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

app.get('/data/:coin', async (req, res) => {
  const { coin } = req.params;
  let file;

  if (coin === 'btc') {
    file = './data/btc_usd_data.csv';
  } else if (coin === 'eth') {
    file = './data/eth_usd_data.csv';
  } else if (coin === 'ada') {
    file = './data/ada_usd_data.csv';
  } else {
    return res.status(404).send('Coin not found');
  }

  try {
    const data = await getData(file);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error reading data');
  }
});

app.get('/predict/:coin', async (req, res) => {
  const { coin } = req.params;
  let file;

  if (coin === 'btc') {
    file = './data/btc_usd_data.csv';
  } else if (coin === 'eth') {
    file = './data/eth_usd_data.csv';
  } else if (coin === 'ada') {
    file = './data/ada_usd_data.csv';
  } else {
    return res.status(404).send('Coin not found');
  }

  try {
    const data = await getData(file);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error reading data');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
