import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import { personalInfo } from '../../data/resume';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { childVariants, containerVariants, noMotionVariants } from '../../utils/animations';
import ParticlesBg from '../ui/ParticlesBg';
import StatCard from '../ui/StatCard';
import TypeWriter from '../ui/TypeWriter';

const Hero = () => {
  const { ref, inView } = useScrollReveal();
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', '#projects');
  };

  return (
    <section id="hero" className="relative flex min-h-[calc(100svh-8rem)] items-center overflow-hidden bg-light pt-16 sm:min-h-[calc(100vh-8rem)] sm:pt-20">
      <ParticlesBg />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />

      <motion.div
        ref={ref}
        variants={reduceMotion ? noMotionVariants : containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 text-center sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:text-left"
      >
        <div className="flex flex-col justify-center">
          <motion.p variants={variants} className="mb-4 font-mono text-sm font-medium text-teal">
            {personalInfo.subtitle}
          </motion.p>
          <motion.h1 variants={variants} className="text-4xl font-bold text-navy sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-navy to-slate bg-clip-text text-transparent">{personalInfo.name}</span>
          </motion.h1>
          <motion.div variants={variants} className="mt-4 text-xl font-semibold sm:mt-5 sm:text-3xl">
            <TypeWriter words={personalInfo.roles} />
          </motion.div>
          <motion.p variants={variants} className="mt-4 max-w-3xl text-sm leading-7 text-mid sm:mt-6 sm:text-lg sm:leading-8">
            {personalInfo.tagline}
          </motion.p>
          <motion.div variants={variants} className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start">
            <button
              type="button"
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center rounded bg-navy px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-teal"
            >
              {personalInfo.ctas.work}
            </button>
            <a
              href={personalInfo.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded border border-navy bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <FaDownload aria-hidden="true" />
              {personalInfo.ctas.resume}
            </a>
          </motion.div>
          <motion.div variants={variants} className="mt-6 grid grid-cols-4 gap-2 sm:mt-10 sm:gap-3">
            {personalInfo.stats.map((stat) => (
              <StatCard key={`${stat.label}-${stat.sublabel}`} stat={stat} />
            ))}
          </motion.div>
        </div>

        <motion.div variants={variants} className="hidden items-center justify-center lg:flex">
          <div className="relative h-[430px] w-[430px]">
            <div className="absolute inset-8 rounded-full border border-slate/20" />
            <div className="absolute inset-16 rounded-full border border-teal/20" />
            <div className="absolute inset-0 rounded-full bg-white/50 blur-3xl" />
            <img
              src={personalInfo.profileIllustration}
              alt="Abstract cloud security engineer illustration"
              width="430"
              height="430"
              className="relative z-10 h-full w-full rounded-full object-cover shadow-soft"
            />
          </div>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 rounded-full p-3 text-navy sm:inline-flex"
      >
        <FaArrowDown className={reduceMotion ? '' : 'animate-bounceSoft'} aria-hidden="true" />
      </button>
    </section>
  );
};

export default Hero;
