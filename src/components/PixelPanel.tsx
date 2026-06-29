import type { ReactNode } from 'react';

interface PixelPanelProps {
  variant?: 'default' | 'dark' | 'gold' | 'inset';
  children: ReactNode;
  className?: string;
  title?: string;
}

export function PixelPanel({
  variant = 'default',
  children,
  className = '',
  title,
}: PixelPanelProps) {
  const classes = [
    'pixel-panel',
    variant !== 'default' && `pixel-panel--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {title && <h2 className="pixel-dialog__title">{title}</h2>}
      {children}
    </div>
  );
}
