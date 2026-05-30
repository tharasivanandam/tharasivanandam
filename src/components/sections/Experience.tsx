import { useReducedMotion } from 'framer-motion';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experience } from '../../data/resume';
import SectionWrapper from '../layout/SectionWrapper';
import TimelineItem from '../ui/TimelineItem';

const Experience = () => {
  const reduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="experience" title="Experience" eyebrow="Applied work">
      <VerticalTimeline lineColor="#1B3A6B" animate={!reduceMotion}>
        {experience.map((entry) => (
          <TimelineItem key={`${entry.title}-${entry.date}`} entry={entry} />
        ))}
      </VerticalTimeline>
    </SectionWrapper>
  );
};

export default Experience;

