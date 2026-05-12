import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cinematic 3D Experience',
  description: 'High-end cinematic 3D landing page with scroll-driven fragmentation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-dark text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
