import { motion, useReducedMotion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaArrowRight } from 'react-icons/fa';
import type { Project } from '../../data/resume';
import { cardHover } from '../../utils/animations';
import Badge from './Badge';

type ProjectCardProps = {
  project: Project;
  onViewDetails: (project: Project) => void;
};

const bulletLabels = ['Architecture', 'Security', 'Outcome'];

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={!reduceMotion}
      glareMaxOpacity={0.12}
      tiltEnable={!reduceMotion}
      className="h-full"
    >
      <motion.article
        whileHover={reduceMotion ? undefined : cardHover}
        className="tilt-card flex h-full flex-col overflow-hidden rounded border border-border bg-white shadow-card"
      >
        <div className="flex h-[60px] items-center bg-gradient-to-r from-navy to-slate px-5">
          <Badge tone="teal">{project.category}</Badge>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-bold text-navy">{project.title}</h3>
          <p className="mt-1 text-sm font-semibold text-slate">{project.subtitle}</p>
          <p className="mt-3 text-sm italic text-teal">{project.role}</p>
          <p className="mt-4 leading-7 text-mid">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 7).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {project.bullets.map((bullet, index) => (
              <div key={bullet} className="rounded bg-light p-3">
                <div className="mb-1 text-xs font-bold uppercase text-teal">{bulletLabels[index] ?? 'Detail'}</div>
                <p className="line-clamp-2 text-sm leading-6 text-mid">{bullet}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <Badge tone={project.status === 'Completed' ? 'teal' : 'navy'}>{project.status}</Badge>
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              className="inline-flex items-center gap-2 rounded bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal"
            >
              View Details
              <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.article>
    </Tilt>
  );
};

export default ProjectCard;

