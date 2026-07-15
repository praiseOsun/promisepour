import React from 'react';
import Hero from '../components/hero';
import TopPicks from '../components/toppicks';
import Build from '../components/build';
import Follow from '../components/follow';

const Home = ({ onNavigate, addToCart }) => {
  return (
    <div className="page-container">
      <Hero onNavigate={onNavigate} />

      {/* Replaced Specials list with dynamic, responsive, interactive TopPicks component */}
      <TopPicks onNavigate={onNavigate} addToCart={addToCart} />
        <Build onNavigate={onNavigate} />
        <Follow />
    </div>
  );
};

export default Home;