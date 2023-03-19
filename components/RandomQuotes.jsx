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

function QuoteCard() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    setQuote(loadingState);
    // fetch a random quote on component mount
    fetch('https://animechan.vercel.app/api/random')
      .then((response) => response.json())
      .then((data) => setQuote(data))
    // eslint-disable-next-line no-console
      .catch((error) => error && setQuote(errorState));
  }, []);

  const handleClick = async () => {
    // fetch a new random quote when button is clicked
    await fetch('https://animechan.vercel.app/api/random')
      .then((response) => response.json())
      .then((data) => setQuote(data));
  };

  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white flex flex-col items-center p-10 w-96 rounded-md">
      <div className="text-center mb-10">
        <FaQuoteLeft className="text-5xl mb-10 mx-auto duration-300" />
        <h1 className="font-bold text-xl mb-10 duration-300">{quote.quote}</h1>
        <p className="text-base mb-2 duration-300">{`-${quote.character}`}</p>
        <h2 className="text-xs duration-300">{quote.anime}</h2>
      </div>
      <button type="button" className="text-5xl duration-300 hover:rotate-90 active:-rotate-90" onClick={handleClick}>
        <FaDiceFive className="" />
      </button>
    </div>
  );
}

export default QuoteCard;
