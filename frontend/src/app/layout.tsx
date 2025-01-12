import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pizzaria Sousa - A melhor pizza da região',
  description:
    'Desde 2000 sendo a melhor pizzaria da região e oferecendo sabores inigualáveis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-right" richColors />
        {children}
      </body>
    </html>
  );
}
