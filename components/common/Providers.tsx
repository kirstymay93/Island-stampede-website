'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
