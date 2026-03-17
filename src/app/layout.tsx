import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alex Johnson — Full Stack Developer',
  description:
    'Full Stack Developer specializing in React, Next.js, Node.js and modern web technologies. Building scalable, performant web applications.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript'],
  authors: [{ name: 'Alex Johnson' }],
  openGraph: {
    title: 'Alex Johnson — Full Stack Developer',
    description: 'Full Stack Developer Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
