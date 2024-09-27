'use client';

import { useEscrow } from '@/utils/hooks/useEscrow';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

const USDC_ADDRESS = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';

export default function Make() {
  const [amount, setAmount] = useState<number>(0);
  const { publicKey, connected } = useWallet();
  const { makeEscrow } = useEscrow();

  const onSubmit = async () => {
    if (!publicKey || !connected) {
      console.log('please connect your wallet');
      return;
    }

    try {
      const res = await makeEscrow({
        mint: USDC_ADDRESS,
        deposit: amount,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={onSubmit}>make</button>
    </div>
  );
}
