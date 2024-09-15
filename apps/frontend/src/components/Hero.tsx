'use client';

import React from 'react';
import PrimaryButton from './buttons/PrimaryButton';
import Features from './Features';

export default function Hero() {
  return (
    <div className="px-2 py-6">
      {/* heading */}
      <div className="font-semibold font-sans text-5xl text-center lg:text-7xl px-5 py-16 max-w-lg lg:max-w-5xl mx-auto">
        <span className="underline">Automate</span> your work as fast as you can
        type
      </div>
      {/* sub heading */}
      <div className="font-semibold text-xl lg:text-2xl text-slate-700 text-center mt-3 lg:max-w-5xl mx-auto">
        Blockchain meets gig economy. solwork empowers you to work, hire, and
        transact globally with the speed and security of Solana.
      </div>
      {/* signups */}
      <div className="flex flex-col lg:space-x-6 lg:flex-row max-w-sm lg:max-w-xl mt-12 mx-auto">
        <PrimaryButton
          onClick={() => {}}
          size="big"
          className="bg-green-700 text-white mb-4 lg:mb-0"
        >
          Start free with email
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {}}
          size="big"
          className="text-black border-2"
        >
          Start free with Google
        </PrimaryButton>
      </div>
      {/* features */}
      <div className="flex flex-col max-w-xs mx-auto mt-12">
        <Features />
      </div>
    </div>
  );
}
