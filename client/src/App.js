import React, { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import PredictionComponent from './components/PredictionComponent';

function App() {
  const [selectedCoin, setSelectedCoin] = useState('btc');

  return (
    <div className="App" style={{textAlign:"center"}}>

      <h1>Cryptocurrency Price Charts & LSTM</h1>
      <select onChange={(e) => setSelectedCoin(e.target.value)} value={selectedCoin}>
        <option value="btc">Bitcoin (BTC)</option>
        <option value="eth">Ethereum (ETH)</option>
        <option value="ada">Cardano (ADA)</option>
      </select>

      <ChartComponent coin={selectedCoin} />
      <PredictionComponent coin={selectedCoin} />
    </div>
  );
}

export default App;
