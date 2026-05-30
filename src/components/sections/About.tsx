import { motion, useReducedMotion } from 'framer-motion';
import { about, personalInfo } from '../../data/resume';
import { childVariants, noMotionVariants } from '../../utils/animations';
import SectionWrapper from '../layout/SectionWrapper';

const orbitPositions = [
  'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
  'right-0 top-1/4 translate-x-1/2',
  'right-10 bottom-6 translate-y-1/2',
  'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2',
  'left-0 bottom-1/4 -translate-x-1/2',
  'left-8 top-8 -translate-x-1/2',
];

const About = () => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;

  return (
    <SectionWrapper id="about" title="About" eyebrow="Candidate signal">
      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div variants={variants}>
          <h3 className="text-2xl font-bold text-navy sm:text-3xl">{about.headline}</h3>
          <div className="mt-6 space-y-5 text-base leading-8 text-mid">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.quickFacts.map((fact) => (
              <div key={fact.label} className="rounded border border-border bg-light p-4">
                <div className="text-xs font-semibold uppercase text-teal">{fact.label}</div>
                <div className="mt-1 text-sm font-semibold text-navy">{fact.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={variants} className="flex justify-center">
          <div className="relative h-[320px] w-[320px] sm:h-[410px] sm:w-[410px]">
            <div className="absolute inset-0 rounded-full bg-light shadow-soft" />
            <div className="absolute inset-6 rounded-full border border-slate/20" />
            <div className="absolute inset-12 rounded-full border border-teal/30" />
            <img
              src={personalInfo.profileIllustration}
              alt="Abstract cybersecurity and cloud engineering avatar for Thara Sivanandam"
              width="410"
              height="410"
              className="absolute inset-12 h-[calc(100%-6rem)] w-[calc(100%-6rem)] rounded-full object-cover shadow-card"
            />
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              {about.orbitBadges.map((badge, index) => (
                <motion.span
                  key={badge}
                  className={`absolute rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-navy shadow-card ${orbitPositions[index]}`}
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;

