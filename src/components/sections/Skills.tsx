import { motion, useReducedMotion } from 'framer-motion';
import { FaCloud, FaCode, FaShieldAlt, FaTools } from 'react-icons/fa';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { skills } from '../../data/resume';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { childVariants, noMotionVariants } from '../../utils/animations';
import SectionWrapper from '../layout/SectionWrapper';
import Badge from '../ui/Badge';
import SkillBar from '../ui/SkillBar';

const categoryIcons = {
  Cloud: FaCloud,
  Dev: FaCode,
  Security: FaShieldAlt,
  DevOps: FaTools,
};

const Skills = () => {
  const { ref, inView } = useScrollReveal();
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;

  return (
    <SectionWrapper id="skills" title="Skills" eyebrow="Technical toolkit" background="light">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.08fr_0.92fr]" ref={ref}>
        <motion.div variants={variants} className="rounded bg-white p-6 shadow-card">
          <h3 className="mb-6 text-lg font-bold text-navy">Proficiency</h3>
          <div className="space-y-5">
            {skills.bars.map((skill) => (
              <SkillBar key={skill.label} skill={skill} inView={inView} />
            ))}
          </div>
        </motion.div>

        <motion.div variants={variants} className="rounded bg-white p-6 shadow-card">
          <h3 className="mb-6 text-lg font-bold text-navy">Tools and Platforms</h3>
          <div className="space-y-5">
            {Object.entries(skills.badges).map(([category, items]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <div key={category}>
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-navy">
                    <Icon className="text-teal" aria-hidden="true" />
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Badge key={item} className="transition-shadow hover:shadow-card">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={variants} className="rounded bg-white p-6 shadow-card">
          <h3 className="mb-6 text-lg font-bold text-navy">Core Competencies</h3>
          <div className="h-[330px]" aria-label="Radar chart of core competency scores">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills.radar} outerRadius="58%" margin={{ top: 18, right: 40, bottom: 18, left: 40 }}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A4A4A', fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#1A6B5A" fill="#1A6B5A" fillOpacity={0.28} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
