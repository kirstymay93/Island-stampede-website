import { Container } from '@/components/ui';
import { siteConfig } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-white">
            {siteConfig.footerTitle}
          </p>
          <p className="text-sm text-brand-silver">
            {siteConfig.eventDate} | {siteConfig.venue}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-silver">
          <a href="#tickets" className="hover:text-brand-blue">
            Buy Tickets
          </a>
          <a href="#sponsors" className="hover:text-brand-blue">
            Become a Sponsor
          </a>
        </div>
      </Container>
    </footer>
  );
}
