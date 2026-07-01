import Link from 'next/link';

import { Navigation } from '@/components/layout/Navigation';
import { Button, Container } from '@/components/ui';
import { siteConfig } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="text-lg font-black uppercase tracking-[0.24em] text-brand-white"
        >
          {siteConfig.shortName}
        </Link>
        <Navigation />
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#tickets" variant="ghost" size="sm">
            Buy Tickets
          </Button>
          <Button href="#sponsors" variant="secondary" size="sm">
            Become a Sponsor
          </Button>
        </div>
      </Container>
    </header>
  );
}
