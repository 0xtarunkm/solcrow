'use client';

import { useEscrow } from '@/utils/hooks/useEscrow';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

export default function Refund() {
  const { publicKey, connected } = useWallet();
  const { refundEscrow } = useEscrow();

  const refundAmount = async () => {
    if (!publicKey || !connected) {
      console.log('wallet not connected');
      return;
    }

    await refundEscrow(
      new PublicKey('7NVU5WQnhacMVeRH4oXrdCQnydPGNHQpMD35EtMVYiLh')
    );
  };
  return (
    <div>
      <button onClick={refundAmount}>refund</button>
    </div>
  );
}
