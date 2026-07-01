import Link from 'next/link';

import { Container, Section } from '@/components/ui';

export default function NotFound() {
  return (
    <Section title="Page not found" eyebrow="404">
      <Container className="space-y-6 text-center">
        <p className="mx-auto max-w-2xl text-base leading-7 text-brand-silver">
          The page you requested is not part of the Island Stampede event
          experience yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-white transition hover:bg-brand-white hover:text-brand-black"
        >
          Return home
        </Link>
      </Container>
    </Section>
  );
}
