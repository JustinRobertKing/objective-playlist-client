import React from 'react';
import ye from './spotify.png'
import './App.css';
import Search from './search/Search'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ye} alt="ye" style={{width: 200, height: 'auto'}} />
        
      </header>
      <Search />
    </div>
  );
}

export default App;
