import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FaAws,
  FaCloud,
  FaCode,
  FaDatabase,
  FaGithub,
  FaLock,
  FaPython,
  FaServer,
  FaTimes,
  FaTools,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { Project } from '../../data/resume';
import { projects } from '../../data/resume';
import { childVariants, noMotionVariants } from '../../utils/animations';
import SectionWrapper from '../layout/SectionWrapper';
import Badge from '../ui/Badge';
import ProjectCard from '../ui/ProjectCard';

const techIconFor = (tech: string): IconType => {
  const key = tech.toLowerCase();
  if (key.includes('aws') || key.includes('cognito')) return FaAws;
  if (key.includes('python') || key.includes('nlp')) return FaPython;
  if (key.includes('github')) return FaGithub;
  if (key.includes('dynamodb') || key.includes('s3')) return FaDatabase;
  if (key.includes('lambda') || key.includes('api')) return FaServer;
  if (key.includes('iam') || key.includes('oauth') || key.includes('exception')) return FaLock;
  if (key.includes('cloudwatch') || key.includes('architecture')) return FaCloud;
  if (key.includes('logging') || key.includes('os')) return FaTools;
  return FaCode;
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    openerRef.current = document.activeElement as HTMLElement;
    const timeout = window.setTimeout(() => closeRef.current?.focus(), 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      openerRef.current?.focus();
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-navy/80 p-4 backdrop-blur"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={reduceMotion ? false : { y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto my-8 max-w-5xl rounded bg-white p-5 shadow-soft sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone="teal">{project.category}</Badge>
                <h3 id="project-modal-title" className="mt-4 text-3xl font-bold text-navy">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-slate">{project.subtitle}</p>
                <p className="mt-3 text-sm italic text-teal">
                  {project.role} | {project.dates}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-border text-navy hover:bg-light"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h4 className="text-lg font-bold text-navy">CAR Details</h4>
                <div className="mt-4 space-y-4">
                  {project.bullets.map((bullet, index) => (
                    <div key={bullet} className="rounded border border-border bg-light p-4">
                      <div className="text-xs font-bold uppercase text-teal">CAR {index + 1}</div>
                      <p className="mt-2 text-sm leading-7 text-mid">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-navy">Architecture</h4>
                  <div className="mt-4 rounded bg-light p-4 font-mono text-sm text-navy">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.architecture.map((node, index) => {
                        const isConnector = node === '->' || node === '|';
                        return (
                          <span
                            key={`${node}-${index}`}
                            className={
                              isConnector
                                ? 'font-bold text-teal'
                                : 'rounded border border-border bg-white px-3 py-2 text-xs font-semibold shadow-sm'
                            }
                          >
                            {node}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy">Tech Stack</h4>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.tech.map((tech) => {
                      const Icon = techIconFor(tech);
                      return (
                        <div key={tech} className="flex items-center gap-2 rounded border border-border bg-white p-3 text-sm font-semibold text-navy">
                          <Icon className="text-teal" aria-hidden="true" />
                          {tech}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;

  return (
    <SectionWrapper id="projects" title="Projects" eyebrow="Proof of build capacity" background="light">
      <motion.div variants={variants} className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onViewDetails={setSelectedProject} />
        ))}
      </motion.div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionWrapper>
  );
};

export default Projects;

