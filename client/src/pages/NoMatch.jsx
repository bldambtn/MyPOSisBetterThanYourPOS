import React from 'react';
import Header from '../components/TitleBanner';
import Footer from '../components/Footer';
import '../index.css';

const NoMatch = () => {
  return (
    <div className="nomatch-page">
      <Header />
      <div className="content">
        <h1>The page you were looking for didn't show up to work today.</h1>
        <p>Let's go somewhere it's on duty</p>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
        <button
          className="home-button"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NoMatch;
