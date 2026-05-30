import { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import Hero from './components/sections/Hero';
import ScrollToTop from './components/ui/ScrollToTop';

const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Education = lazy(() => import('./components/sections/Education'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Contact = lazy(() => import('./components/sections/Contact'));

const sectionFallback = (
  <div className="mx-auto flex min-h-[240px] max-w-6xl items-center justify-center px-6 text-sm font-medium text-mid">
    Loading section...
  </div>
);

function App() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return;

    const timeout = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>Thara Sivanandam | Cloud Engineer and DevSecOps Portfolio</title>
        <meta
          name="description"
          content="M.S. Cybersecurity graduate, GPA 3.89, Drexel University. Cloud engineer with 10+ AWS deployments, Python automation, and DevSecOps experience. Authorized to work in the United States under F-1 OPT through December 2026."
        />
        <meta property="og:title" content="Thara Sivanandam | Cloud Engineer Portfolio" />
        <meta
          property="og:description"
          content="Recruiter-focused portfolio showcasing AWS cloud infrastructure, Python automation, and DevSecOps skills."
        />
        <meta property="og:url" content="https://tharasivanandam.github.io/tharasivanandam/" />
        <meta
          name="keywords"
          content="Cloud Engineer, DevSecOps, AWS, Python, Cybersecurity, Philadelphia, OPT, F-1 OPT, Infrastructure as Code, Terraform"
        />
      </Helmet>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={sectionFallback}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
