'use client';

import { useEscrow } from '@/utils/hooks/useEscrow';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import React from 'react';

export default function Take() {
  const { publicKey, connected } = useWallet();
  const { takerEscrow } = useEscrow();

  const takeAmount = async () => {
    if (!publicKey || !connected) {
      console.log('wallet not connected');
      return;
    }

    await takerEscrow(
      new PublicKey('3Vzpcz5hMTiYUvwQaKuiCDESuJX8pmZt64ZW11Zjkp3g')
    );
  };
  return (
    <div>
      <button onClick={takeAmount}>take amount</button>
    </div>
  );
}
