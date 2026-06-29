import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface CosmicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gold' | 'primary';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function CosmicButton({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: CosmicButtonProps) {
  const classes = [
    'cosmic-btn',
    variant !== 'default' && `cosmic-btn--${variant}`,
    size === 'sm' && 'cosmic-btn--sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
