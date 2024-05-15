import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
// import SinglePlayer from './components/SinglePlayer'; // Import SinglePlayer component
// import TwoPlayers from './components/TwoPlayers'; // Import TwoPlayers component
import Main2 from './components/Main2';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/single-player" element={<Main2/>}>
            
          </Route>
          <Route path="/two-players" element={<Main/>}>
            
          </Route>
          <Route path="/" element={<Home/>}>
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
