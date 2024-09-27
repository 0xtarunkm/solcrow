import AppBar from '@/components/AppBar';
import Hero from '@/components/Hero';
import Make from '@/components/Make';
import Refund from '@/components/Refund';
import Take from '@/components/Take';

export default function Home() {
  return (
    <div className="h-screen">
      <AppBar />
      <Hero />
      <Make />
      <Refund />
      <Take />
    </div>
  );
}
