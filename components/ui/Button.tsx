import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-blue text-brand-white hover:bg-brand-white hover:text-brand-black',
        secondary:
          'border border-white/20 bg-transparent text-brand-white hover:border-brand-blue hover:text-brand-blue',
        ghost: 'text-brand-white hover:text-brand-blue',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-5 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type SharedButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonLinkProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function isButtonLinkProps(
  props: ButtonProps | ButtonLinkProps,
): props is ButtonLinkProps {
  return 'href' in props && typeof props.href === 'string';
}

export function Button(props: ButtonProps | ButtonLinkProps) {
  const className = cn(
    buttonVariants({ variant: props.variant, size: props.size }),
    props.className,
  );

  if (isButtonLinkProps(props)) {
    const {
      href,
      className: _className,
      size: _size,
      variant: _variant,
      ...anchorProps
    } = props;
    return <a {...anchorProps} href={href} className={className} />;
  }

  const {
    className: _className,
    size: _size,
    variant: _variant,
    type = 'button',
    ...buttonProps
  } = props as ButtonProps;
  return (
    <button
      {...buttonProps}
      type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
      className={className}
    />
  );
}
