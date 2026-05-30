import type { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { containerVariants, noMotionVariants } from '../../utils/animations';

type SectionWrapperProps = PropsWithChildren<{
  id: string;
  title: string;
  eyebrow?: string;
  background?: 'white' | 'light';
}>;

const SectionWrapper = ({ id, title, eyebrow, background = 'white', children }: SectionWrapperProps) => {
  const { ref, inView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className={background === 'light' ? 'overflow-hidden bg-light py-8' : 'overflow-hidden bg-white py-8'}>
      <motion.div
        ref={ref}
        className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8"
        variants={reduceMotion ? noMotionVariants : containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase text-teal">{eyebrow}</p> : null}
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
