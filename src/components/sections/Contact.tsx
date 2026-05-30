import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaEnvelope,
  FaExclamationCircle,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa';
import { contact, personalInfo } from '../../data/resume';
import { childVariants, noMotionVariants } from '../../utils/animations';
import SectionWrapper from '../layout/SectionWrapper';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Toast = {
  type: 'success' | 'error';
  message: string;
};

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? noMotionVariants : childVariants;
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: contact.subjects[0],
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setToast(null);

    const formData = new FormData();
    formData.append('access_key', contact.web3forms.accessKey);
    formData.append('from_name', `${personalInfo.name} Portfolio`);
    formData.append('name', form.name.trim());
    formData.append('email', form.email.trim());
    formData.append('subject', form.subject);
    formData.append('message', form.message.trim());

    try {
      const response = await fetch(contact.web3forms.endpoint, {
        method: 'POST',
        body: formData,
      });
      const data = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? 'Web3Forms submission failed');
      }

      setToast({
        type: 'success',
        message: 'Message sent. Thank you for reaching out.',
      });
      setForm({ name: '', email: '', subject: contact.subjects[0], message: '' });
    } catch {
      setToast({ type: 'error', message: 'Message could not be sent. Please email Thara directly.' });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <SectionWrapper id="contact" title={contact.headline} eyebrow="Recruiter contact">
      <motion.div variants={variants} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <motion.div
            initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-light text-3xl text-navy"
          >
            <FaEnvelope aria-hidden="true" />
          </motion.div>
          <p className="max-w-xl text-base leading-8 text-mid">{contact.subheadline}</p>
          <div className="mt-8 space-y-4">
            <a href={`mailto:${personalInfo.links.email}`} className="flex items-center gap-3 text-sm font-semibold text-navy hover:text-teal">
              <FaEnvelope aria-hidden="true" />
              {personalInfo.links.email}
            </a>
            <a href={personalInfo.links.linkedin} className="flex items-center gap-3 text-sm font-semibold text-navy hover:text-teal">
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
            <a href={personalInfo.links.github} className="flex items-center gap-3 text-sm font-semibold text-navy hover:text-teal">
              <FaGithub aria-hidden="true" />
              GitHub
            </a>
            <p className="flex items-center gap-3 text-sm font-semibold text-navy">
              <FaMapMarkerAlt aria-hidden="true" />
              {personalInfo.links.location}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded border border-border bg-white p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">
              Name
              <input
                required
                name="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="mt-2 w-full rounded border border-border px-4 py-3 text-mid"
                autoComplete="name"
              />
            </label>
            <label className="text-sm font-semibold text-navy">
              Email
              <input
                required
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="mt-2 w-full rounded border border-border px-4 py-3 text-mid"
                autoComplete="email"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-navy">
            Subject
            <select
              name="subject"
              value={form.subject}
              onChange={(event) => updateField('subject', event.target.value)}
              className="mt-2 w-full rounded border border-border px-4 py-3 text-mid"
            >
              {contact.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">
            Message
            <textarea
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              className="mt-2 w-full resize-y rounded border border-border px-4 py-3 text-mid"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {loading ? <FaSpinner className="animate-spin" aria-hidden="true" /> : <FaPaperPlane aria-hidden="true" />}
            {loading ? 'Sending' : 'Send Message'}
          </button>
          {toast ? (
            <div
              className={`mt-4 flex items-start gap-3 rounded p-4 text-sm font-semibold ${
                toast.type === 'success' ? 'bg-teal/10 text-teal' : 'bg-red-50 text-red-700'
              }`}
              role="status"
            >
              <FaExclamationCircle className="mt-0.5" aria-hidden="true" />
              {toast.message}
            </div>
          ) : null}
        </form>
      </motion.div>
    </SectionWrapper>
  );
};

export default Contact;
