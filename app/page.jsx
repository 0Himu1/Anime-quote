'use client';

import { useState } from 'react';
import QuoteCard from '@/components/RandomQuotes';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex flex-col justify-center items-center bg-gray-300 dark:bg-slate-900 h-screen w-screen font-lato">
        <QuoteCard setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
    </div>
  );
}
