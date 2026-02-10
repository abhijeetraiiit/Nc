import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Nc - Next-Generation E-commerce Platform',
  description: 'India-focused multivendor marketplace with AI-powered features',
  keywords: ['e-commerce', 'india', 'multivendor', 'AI', 'vernacular'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
