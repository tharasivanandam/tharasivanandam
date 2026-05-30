import { motion, useReducedMotion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { education } from '../../data/resume';
import { childVariants, noMotionVariants } from '../../utils/animations';
import SectionWrapper from '../layout/SectionWrapper';
import Badge from '../ui/Badge';

const Education = () => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;

  return (
    <SectionWrapper id="education" title="Education" eyebrow="Academic foundation">
      <motion.div variants={variants} className="grid gap-6 lg:grid-cols-2">
        {education.map((item) => (
          <div key={item.degree} className="h-[360px] [perspective:1200px]">
            <motion.article
              tabIndex={0}
              whileHover={reduceMotion ? undefined : { rotateY: 180 }}
              whileFocus={reduceMotion ? undefined : { rotateY: 180 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="preserve-3d relative h-full w-full rounded shadow-card"
            >
              <div className="backface-hidden absolute inset-0 rounded border border-border bg-white p-6">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded bg-gradient-to-br from-navy to-slate text-3xl text-white">
                  <FaGraduationCap aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-navy">{item.degree}</h3>
                <p className="mt-3 font-semibold text-slate">{item.school}</p>
                <p className="mt-1 text-sm text-mid">{item.location}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded bg-light p-4">
                    <div className="text-xs font-bold uppercase text-teal">GPA</div>
                    <div className="mt-1 font-mono text-lg font-semibold text-navy">{item.gpa}</div>
                  </div>
                  <div className="rounded bg-light p-4">
                    <div className="text-xs font-bold uppercase text-teal">Dates</div>
                    <div className="mt-1 text-sm font-semibold text-navy">{item.dates}</div>
                  </div>
                </div>
              </div>

              <div className="backface-hidden absolute inset-0 rotate-y-180 rounded border border-border bg-navy p-6 text-white [transform:rotateY(180deg)]">
                <h3 className="text-2xl font-bold">Relevant Coursework</h3>
                <p className="mt-2 text-sm text-white/80">{item.school}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {item.courses.map((course) => (
                    <Badge key={course} tone="light" className="border-white/20 bg-white/95">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Education;

