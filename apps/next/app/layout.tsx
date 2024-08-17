import type { Metadata } from 'next';
import { NextTamaguiProvider } from './NextTamaguiProvider';

export const metadata: Metadata = {
  title: 'Foodia',
  description: 'Tamagui, Solito, Expo & Next.js',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  );
}
