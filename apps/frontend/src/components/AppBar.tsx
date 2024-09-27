'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { usePathname, useRouter } from 'next/navigation';

export default function AppBar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 sticky top-0 z-20 bg-white">
      {/* left section */}
      <div className="flex items-center space-x-3">
        <HamburgerIcon />
        <div
          className="font-semibold font-mono text-green-600 text-3xl cursor-pointer"
          onClick={() => {
            router.push('/');
          }}
        >
          solwork
        </div>
        {/* options */}
        <div className="lg:flex items-center space-x-4 pl-4 hidden">
          <p className="text-normal font-mono cursor-pointer">find talent</p>
          <p className="text-normal font-mono cursor-pointer">find work</p>
        </div>
      </div>

      {/* right section */}
      <div className="flex items-center space-x-6">
        <button
          className="text-lg font-semibold cursor-pointer"
          onClick={() =>
            router.push(`${path == '/signup' ? '/login' : '/signup'}`)
          }
        >
          {path == '/signup' ? 'Login' : 'Sign up'}
        </button>
        <WalletMultiButton />
      </div>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-7 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}
