import type { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren<{
  tone?: 'navy' | 'slate' | 'teal' | 'light';
  className?: string;
}>;

const toneClasses = {
  navy: 'bg-navy text-white',
  slate: 'bg-slate text-white',
  teal: 'bg-teal text-white',
  light: 'bg-light text-navy border border-border',
};

const Badge = ({ tone = 'light', className = '', children }: BadgeProps) => {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}>{children}</span>;
};

export default Badge;

