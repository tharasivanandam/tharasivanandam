import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Stat } from '../../data/resume';

type StatCardProps = {
  stat: Stat;
};

const StatCard = ({ stat }: StatCardProps) => {
  const [display, setDisplay] = useState(stat.numericValue === undefined ? '' : '0');
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (stat.numericValue === undefined || reduceMotion) {
      setDisplay(stat.value);
      return;
    }

    let frame = 0;
    const duration = 650;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = stat.numericValue ? stat.numericValue * eased : 0;
      setDisplay(`${next.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(stat.value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, stat]);

  return (
    <motion.div
      ref={ref}
      className="rounded border border-white/60 bg-white/85 p-2 text-center shadow-card backdrop-blur sm:p-4"
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="font-mono text-2xl font-semibold text-navy sm:text-3xl">{display || stat.value}</div>
      <div className="mt-1 text-[11px] font-semibold leading-4 text-mid sm:text-sm">{stat.label}</div>
      <div className="text-[10px] font-medium leading-4 text-teal sm:text-xs">{stat.sublabel}</div>
    </motion.div>
  );
};

export default StatCard;
