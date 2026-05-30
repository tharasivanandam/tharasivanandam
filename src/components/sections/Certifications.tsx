import { motion, useReducedMotion } from 'framer-motion';
import { FaAws, FaCertificate, FaGoogle } from 'react-icons/fa';
import { certifications } from '../../data/resume';
import { childVariants, noMotionVariants } from '../../utils/animations';
import SectionWrapper from '../layout/SectionWrapper';

const Certifications = () => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;

  return (
    <SectionWrapper id="certifications" title="Certifications" eyebrow="Current credentials" background="light">
      <motion.div variants={variants} className="grid gap-6 lg:grid-cols-2">
        {certifications.map((cert) => {
          const Icon = cert.issuer.includes('Google') ? FaGoogle : cert.issuer.includes('Amazon') ? FaAws : FaCertificate;
          return (
            <motion.article
              key={cert.name}
              whileHover={reduceMotion ? undefined : { y: -6, boxShadow: '0 20px 40px rgba(27, 58, 107, 0.15)' }}
              className="relative overflow-hidden rounded border border-border bg-white p-6 shadow-card"
            >
              <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: cert.colour }} aria-hidden="true" />
              {cert.active ? (
                <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded text-3xl text-white" style={{ backgroundColor: cert.colour }}>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">{cert.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-mid">{cert.issuer}</p>
                  <span className="mt-4 inline-flex rounded-full bg-light px-3 py-1 text-xs font-bold text-teal">{cert.status}</span>
                  <p className="mt-4 text-sm leading-6 text-mid">{cert.note}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
};

export default Certifications;

