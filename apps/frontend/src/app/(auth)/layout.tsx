import AppBar from '@/components/AppBar';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}
