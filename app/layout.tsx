import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SketchUp',
    template: '%s | SketchUp',
  },
  description:
    'SketchUp is a user-friendly drawing tool. It allows users to create, edit, and collaborate on visual projects effortlessly, making it ideal for brainstorming and design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
