import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './styles/globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Team Charlie Project',
    template: '%s | Team Charlie Project',
  },
  description: 'Team Charlie web application',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}