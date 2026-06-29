import type { ReactNode } from 'react';

interface CosmicPanelProps {
  variant?: 'default' | 'gold' | 'glass';
  children: ReactNode;
  className?: string;
  title?: string;
}

export function CosmicPanel({
  variant = 'default',
  children,
  className = '',
  title,
}: CosmicPanelProps) {
  const classes = [
    'cosmic-panel',
    variant !== 'default' && `cosmic-panel--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {title && <h2 className="cosmic-dialog__title">{title}</h2>}
      {children}
    </div>
  );
}
