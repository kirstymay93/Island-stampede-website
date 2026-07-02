import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { Footer, Header } from '@/components/layout';
import { Providers } from '@/components/common/Providers';
import { siteConfig } from '@/lib/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.islandstampede.com.au'),
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="page-shell text-brand-white antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
