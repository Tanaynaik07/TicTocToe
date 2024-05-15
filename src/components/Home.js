import React from 'react';
import { Link } from 'react-router-dom';
import "../components/home.css";

const Home = () => {
  return (
    <div id='home'>
      <h1>Welcome to Tic-Tac-Toe</h1>

      <div id="players">

      <Link to="/single-player"><button>Single Player</button></Link>
      <br />
      <Link to="/two-players"><button>Two Players</button></Link>
      </div>
    </div>
  );
};

export default Home;
