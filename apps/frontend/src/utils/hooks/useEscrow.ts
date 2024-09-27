import { AnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import useAnchorProvider from './useAnchorProvider';
import { useMemo } from 'react';
import { BN, Program } from '@coral-xyz/anchor';
import { Escrow } from '../anchor/escrowIdlType';
import idl from '@/utils/anchor/escrowIdl.json';
import { PublicKey } from '@solana/web3.js';
import {
  getAssociatedTokenAddressSync,
  getMint,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { randomBytes } from 'crypto';

export const useEscrow = () => {
  const wallet = useWallet();
  const anchorProvider = useAnchorProvider();

  const anchorWallet = wallet as AnchorWallet;

  const program = useMemo(() => {
    if (anchorWallet) {
      return new Program<Escrow>(idl as Escrow, anchorProvider);
    }
  }, [anchorWallet, anchorProvider]);

  const isToken2022 = async (mint: PublicKey) => {
    const mintInfo = await anchorProvider.connection.getAccountInfo(mint);
    return mintInfo?.owner.equals(TOKEN_2022_PROGRAM_ID);
  };

  const getMintInfo = async (mint: PublicKey) => {
    const tokenProgram = (await isToken2022(mint))
      ? TOKEN_2022_PROGRAM_ID
      : TOKEN_PROGRAM_ID;

    return getMint(anchorProvider.connection, mint, undefined, tokenProgram);
  };

  const makeEscrow = async ({
    mint,
    deposit,
  }: {
    mint: string;
    deposit: number;
  }) => {
    if (!program) {
      throw new Error('Program not initialized');
    }

    if (!wallet.publicKey) {
      console.log('Wallet not connected');
      return;
    }

    try {
      const seed = new BN(randomBytes(8));
      const tokenProgram = (await isToken2022(new PublicKey(mint)))
        ? TOKEN_2022_PROGRAM_ID
        : TOKEN_PROGRAM_ID;

      const makerAta = getAssociatedTokenAddressSync(
        new PublicKey(mint),
        wallet.publicKey,
        false,
        tokenProgram
      );

      const [escrow] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('escrow'),
          wallet.publicKey.toBuffer(),
          seed.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId
      );

      const vault = getAssociatedTokenAddressSync(
        new PublicKey(mint),
        escrow,
        true,
        tokenProgram
      );

      const mintInfo = await getMintInfo(new PublicKey(mint));
      const mintAmount = new BN(deposit).mul(
        new BN(10).pow(new BN(mintInfo.decimals))
      );

      await program.methods
        .make(seed, mintAmount)
        .accountsPartial({
          maker: wallet.publicKey,
          mint,
          escrow,
          makerAta,
          vault,
          tokenProgram,
        })
        .rpc();

      return escrow.toString();
    } catch (error) {
      console.log(error);
    }
  };

  const refundEscrow = async (escrow: PublicKey) => {
    if (!program) {
      throw new Error('Program not initialized');
    }

    try {
      const escrowAccount = await getEscrowInfo(escrow);

      const tokenProgram = (await isToken2022(escrowAccount.mint))
        ? TOKEN_2022_PROGRAM_ID
        : TOKEN_PROGRAM_ID;

      const makerAta = getAssociatedTokenAddressSync(
        new PublicKey(escrowAccount.mint),
        escrowAccount.maker,
        false,
        tokenProgram
      );

      const vault = getAssociatedTokenAddressSync(
        new PublicKey(escrowAccount.mint),
        escrow,
        true,
        tokenProgram
      );

      return program.methods
        .refund()
        .accountsPartial({
          maker: escrowAccount.maker,
          mint: new PublicKey(escrowAccount.mint),
          makerAta,
          vault,
          escrow,
          tokenProgram,
        })
        .rpc();
    } catch (error) {
      console.log(error);
    }
  };

  const takerEscrow = async (escrow: PublicKey) => {
    if (!program) {
      throw new Error('Program not initialized');
    }

    if (!wallet.publicKey) {
      console.log('Wallet not connected');
      return;
    }

    try {
      const escrowAccount = await getEscrowInfo(escrow);
      const mintInfo = await getMintInfo(escrowAccount.mint);

      const tokenProgram = (await isToken2022(escrowAccount.mint))
        ? TOKEN_2022_PROGRAM_ID
        : TOKEN_PROGRAM_ID;

      const vault = getAssociatedTokenAddressSync(
        new PublicKey(escrowAccount.mint),
        escrow,
        true,
        tokenProgram
      );

      const takerAta = getAssociatedTokenAddressSync(
        new PublicKey(escrowAccount.mint),
        wallet.publicKey,
        false,
        tokenProgram
      );

      return program.methods
        .take()
        .accountsPartial({
          taker: wallet.publicKey,
          maker: escrowAccount.maker,
          mint: new PublicKey(escrowAccount.mint),
          escrow,
          takerAta,
          vault,
          tokenProgram,
        })
        .rpc();
    } catch (error) {
      console.log(error);
    }
  };

  const getEscrowInfo = async (escrow: PublicKey) => {
    if (!program) {
      throw new Error('Program not initialized');
    }

    return program.account.escrow.fetch(escrow);
  };

  const getAllEscrowAccounts = async () => {
    if (!program) {
      throw new Error('Program not initialized');
    }
    const escrowAccounts = await program.account.escrow.all();

    return escrowAccounts;
  };

  return {
    makeEscrow,
    refundEscrow,
    takerEscrow,
    getEscrowInfo,
    getAllEscrowAccounts,
  };
};
