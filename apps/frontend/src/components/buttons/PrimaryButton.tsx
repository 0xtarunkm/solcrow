import { ReactNode } from 'react';

export default function PrimaryButton({
  children,
  onClick,
  size = 'small',
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  size: 'small' | 'big';
  className?: string;
}) {
  return (
    <button
      className={`px-2 py-3 text-center  ${
        size == 'small' ? 'text-sm px-4 py-2' : 'text-xl px-8 py-4'
      } font-semibold rounded-full cursor-pointer hover:shadow-lg shadow-green-400 transition duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
