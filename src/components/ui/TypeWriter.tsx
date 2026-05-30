import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type TypeWriterProps = {
  words: string[];
};

const TypeWriter = ({ words }: TypeWriterProps) => {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion || words.length === 0) return;

    const current = words[wordIndex] ?? '';
    const doneTyping = !isDeleting && charIndex === current.length;
    const doneDeleting = isDeleting && charIndex === 0;
    const delay = doneTyping ? 950 : isDeleting ? 36 : 62;

    const timeout = window.setTimeout(() => {
      if (doneTyping) {
        setIsDeleting(true);
        return;
      }

      if (doneDeleting) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setCharIndex((index) => index + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, isDeleting, reduceMotion, wordIndex, words]);

  const currentWord = reduceMotion ? words[0] : (words[wordIndex] ?? '').slice(0, charIndex);

  return (
    <span className="inline-flex min-h-[1.25em] items-center text-slate">
      {currentWord}
      {!reduceMotion ? <span className="ml-1 h-7 w-0.5 animate-pulse bg-teal" aria-hidden="true" /> : null}
    </span>
  );
};

export default TypeWriter;

