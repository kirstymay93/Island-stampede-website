import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'surface-panel flex h-full flex-col rounded-3xl p-6 shadow-glow transition duration-200 hover:border-brand-blue/40 md:p-8',
        className,
      )}
    />
  );
}
