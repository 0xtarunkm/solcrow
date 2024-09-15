'use client';

import AppBar from '@/components/AppBar';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import Features from '@/components/Features';
import InputButton from '@/components/InputField';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  return (
    <main className="flex">
      <div className="flex flex-col sm:flex-row max-w-6xl mx-auto py-12 sm:py-24">
        {/* header */}
        <div className="flex-1">
          <div className="text-3xl font-bold font-mono px-4 py-8">
            Connect with a worldwide network of talent and clients on solwork's
            decentralized platform.
          </div>
          <div className="hidden sm:flex">
            <Features />
          </div>
        </div>
        <div className="lg:w-1/3">
          {/* google auth button */}
          <div className="px-4">
            <PrimaryButton
              className="rounded-md bg-blue-500 text-white font-semibold w-full"
              onClick={() => {}}
              size="big"
            >
              Sign up with Google
            </PrimaryButton>
          </div>
          {/* email */}

          <div className="px-4 py-8 flex flex-col space-y-4">
            <InputButton type="text" label="Work Email" />
            <InputButton type="password" label="Password" />
            <InputButton type="text" label="First Name" />
            <InputButton type="text" label="Last Name" />
            <PrimaryButton
              size="big"
              className="bg-green-600 text-white font-mono"
              onClick={() => {
                router.push('/dashboard');
              }}
            >
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </main>
  );
}
