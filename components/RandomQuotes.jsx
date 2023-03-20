/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */

'use client';

import React, { useState, useEffect } from 'react';
import { FaDiceFive, FaQuoteLeft } from 'react-icons/fa';

const loadingState = {
  quote: 'Loading...',
  anime: 'This one too',
  character: 'Also Loadding..',
};

const errorState = {
  quote: 'Something Went Wrong',
  anime: 'Later',
  character: 'Try Again',
};

const mostWatchedAnime = [
  'Demon Slayer',
  'Attack on Titan',
  'Naruto',
  'One Piece',
  'Death Note',
  'Fullmetal Alchemist: Brotherhood',
  'My Hero Academia',
  'Dragon Ball Z',
  'Sailor Moon',
  'Neon Genesis Evangelion',
  'Cowboy Bebop',
  'Bleach',
  'Hunter x Hunter',
  "JoJo's Bizarre Adventure",
  'Fairy Tail',
  'Code Geass',
  'Sword Art Online',
  'One Punch Man',
  'Yu-Gi-Oh!',
  'The Promised Neverland',
];

function QuoteCard({ setDarkMode, darkMode }) {
  const [quote, setQuote] = useState({});
  const [animes] = useState(mostWatchedAnime);
  // eslint-disable-next-line no-unused-vars
  const [currentAnime, setCurrentAnime] = useState('Naruto');
  const [url, setUrl] = useState(
    'https://animechan.vercel.app/api/random/anime?title=naruto',
  );

  useEffect(() => {
    setQuote(loadingState);

    const fetchQuotes = async () => {
      // fetch a random quote on component mount
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuote(data))
        .catch((error) => {
          console.log(error);
          setQuote(errorState);
        });
    };
    fetchQuotes();
  }, [url]);

  const handleClick = async () => {
    // fetch a new random quote when button is clicked
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setQuote(data));
  };

  const handleTitle = (title) => {
    // Change the current Anime to the anime user Clicked.
    setCurrentAnime(title);

    // Change the URL to fetch a random quote for the selected anime title.
    const encodedTitle = encodeURIComponent(title);
    const newUrl = `https://animechan.vercel.app/api/random/anime?title=${encodedTitle}`;
    setUrl(newUrl);
  };

  return (
    <div className="lg:flex justify-center items-center gap-10">
      <div className="bg-white dark:bg-slate-800 dark:text-white flex flex-col items-center p-10 w-96 rounded-md mb-20">
        <div className="text-center mb-10">
          <FaQuoteLeft className="text-5xl mb-10 mx-auto duration-300" onClick={() => setDarkMode(!darkMode)} />
          <h1 className="font-bold text-xl mb-10 duration-300">
            {quote.quote}
          </h1>
          <p className="text-base mb-2 duration-300">{`-${quote.character}`}</p>
          <h2 className="text-xs duration-300">{quote.anime}</h2>
        </div>
        <button
          type="button"
          className="text-5xl duration-300 hover:rotate-90 active:-rotate-90"
          onClick={handleClick}
        >
          <FaDiceFive className="" />
        </button>
      </div>
      <div className="flex items-center flex-wrap gap-2 p-10 w-96 bg-white dark:bg-slate-800 dark:text-white rounded-md">
        {animes.map((title, i) => (
          <p
            key={i}
            className="p-1 px-2 bg-slate-800 text-white dark:bg-gray-50 dark:text-slate-900 text-xs rounded-sm cursor-pointer"
            onClick={() => handleTitle(title)}
          >
            {title}
          </p>
        ))}
      </div>
    </div>
  );
}

export default QuoteCard;
