import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gold' | 'green' | 'danger';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function PixelButton({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: PixelButtonProps) {
  const classes = [
    'pixel-btn',
    variant !== 'default' && `pixel-btn--${variant}`,
    size === 'sm' && 'pixel-btn--sm',
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
