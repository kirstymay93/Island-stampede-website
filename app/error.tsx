'use client';

import { useEffect } from 'react';

import { Container, Section } from '@/components/ui';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section title="Something went wrong" eyebrow="Error">
      <Container className="space-y-6 text-center">
        <p className="mx-auto max-w-2xl text-base leading-7 text-brand-silver">
          We hit an unexpected issue while loading the Island Stampede
          experience.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-white transition hover:bg-brand-white hover:text-brand-black"
        >
          Try again
        </button>
      </Container>
    </Section>
  );
}
