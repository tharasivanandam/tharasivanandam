import { useState } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FaChevronDown, FaChevronUp, FaCloud, FaCode, FaShieldAlt } from 'react-icons/fa';
import type { ExperienceEntry } from '../../data/resume';

const iconMap = {
  cloud: FaCloud,
  shield: FaShieldAlt,
  code: FaCode,
};

type TimelineItemProps = {
  entry: ExperienceEntry;
};

const TimelineItem = ({ entry }: TimelineItemProps) => {
  const [openBullet, setOpenBullet] = useState<number | null>(0);
  const Icon = iconMap[entry.icon];

  return (
    <VerticalTimelineElement
      date={entry.date}
      icon={<Icon aria-hidden="true" />}
      iconStyle={{ background: '#1B3A6B', color: '#fff', boxShadow: '0 0 0 4px #E2E8F0' }}
      contentStyle={{ background: '#fff', color: '#4A4A4A' }}
      contentArrowStyle={{ borderRight: '7px solid #fff' }}
    >
      <div>
        <h3 className="text-xl font-bold text-navy">{entry.title}</h3>
        <p className="mt-1 text-sm font-semibold text-mid">
          {entry.org} | {entry.location}
        </p>
        <p className="mt-3 text-sm italic text-teal">{entry.badge}</p>
        <div className="mt-5 space-y-3">
          {entry.bullets.map((bullet, index) => {
            const isOpen = openBullet === index;
            return (
              <button
                key={bullet}
                type="button"
                onClick={() => setOpenBullet(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full rounded border border-border bg-light p-4 text-left transition-colors hover:border-teal hover:bg-white"
              >
                <span className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <span className="flex-1 text-sm leading-6 text-mid">
                    <span className={isOpen ? '' : 'line-clamp-2'}>{bullet}</span>
                  </span>
                  <span className="mt-1 text-navy">{isOpen ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

export default TimelineItem;

