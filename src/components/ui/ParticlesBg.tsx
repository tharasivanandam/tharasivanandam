import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBg = () => {
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, [reduceMotion]);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      background: { color: { value: 'transparent' } },
      particles: {
        number: { value: 80, density: { enable: true } },
        color: { value: ['#1B3A6B', '#2E5090', '#1A6B5A'] },
        links: {
          enable: true,
          color: '#2E5090',
          distance: 145,
          opacity: 0.22,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.45,
          direction: 'none' as const,
          outModes: { default: 'bounce' as const },
        },
        opacity: { value: { min: 0.22, max: 0.5 } },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 95, duration: 0.3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (reduceMotion || !ready) {
    return <div className="absolute inset-0 bg-light" aria-hidden="true" />;
  }

  return <Particles id="hero-particles" className="absolute inset-0" options={options} aria-hidden="true" />;
};

export default ParticlesBg;
