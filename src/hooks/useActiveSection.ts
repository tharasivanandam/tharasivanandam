import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const current = sectionIds.reduce((active, id) => {
        const element = document.getElementById(id);
        if (!element) return active;

        const { top } = element.getBoundingClientRect();
        if (top <= 140) return id;
        return active;
      }, sectionIds[0] ?? '');

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};

