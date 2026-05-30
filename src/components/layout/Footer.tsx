import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { footer, personalInfo } from '../../data/resume';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center text-sm text-mid sm:px-6 lg:flex-row lg:text-left">
        <p>{footer.copyright}</p>
        <p>{footer.builtWith}</p>
        <div className="flex items-center gap-4">
          <a href={personalInfo.links.linkedin} aria-label="LinkedIn" className="text-navy transition-colors hover:text-teal">
            <FaLinkedin aria-hidden="true" />
          </a>
          <a href={personalInfo.links.github} aria-label="GitHub" className="text-navy transition-colors hover:text-teal">
            <FaGithub aria-hidden="true" />
          </a>
          <a href={`mailto:${personalInfo.links.email}`} aria-label="Email" className="text-navy transition-colors hover:text-teal">
            <FaEnvelope aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

