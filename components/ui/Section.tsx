import type { HTMLAttributes, ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: ReactNode;
};

export function Section({
  children,
  className,
  eyebrow,
  title,
  ...props
}: SectionProps) {
  return (
    <section {...props} className={cn('py-16 md:py-24', className)}>
      {(eyebrow || title) && (
        <Container className="mb-10 space-y-4">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.22em] text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="max-w-3xl text-3xl font-black text-brand-white md:text-5xl">
              {title}
            </h2>
          ) : null}
        </Container>
      )}
      {children}
    </section>
  );
}
