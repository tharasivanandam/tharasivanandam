import { motion, useReducedMotion } from 'framer-motion';
import type { SkillBar as SkillBarData } from '../../data/resume';

const fillClasses = {
  navy: 'bg-navy',
  slate: 'bg-slate',
  teal: 'bg-teal',
};

type SkillBarProps = {
  skill: SkillBarData;
  inView: boolean;
};

const SkillBar = ({ skill, inView }: SkillBarProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-navy">{skill.label}</span>
        <span className="font-mono text-sm text-mid">{skill.value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <motion.div
          className={`h-full rounded-full ${fillClasses[skill.color]}`}
          initial={{ width: reduceMotion ? `${skill.value}%` : 0 }}
          animate={{ width: inView || reduceMotion ? `${skill.value}%` : 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
};

export default SkillBar;

