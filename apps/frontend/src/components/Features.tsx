import Feature from './Feature';

export default function Features() {
  return (
    <div className="space-y-2">
      <Feature>
        Instant{' '}
        <span className="font-semibold underline">Escrow & Payments</span>
      </Feature>
      <Feature>
        <span className="font-semibold underline">Blockchain-Verified</span>{' '}
        Reputation
      </Feature>
      <Feature>
        <span className="font-semibold underline">Borderless</span> Talent Pool
      </Feature>
      <Feature>
        <span className="font-semibold underline">Low-Fee</span> Transactions
      </Feature>
    </div>
  );
}
