export type IconKey = 'cloud' | 'shield' | 'code';

export type Stat = {
  value: string;
  numericValue?: number;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
};

export type SkillBar = {
  label: string;
  value: number;
  color: 'navy' | 'slate' | 'teal';
};

export type ExperienceEntry = {
  date: string;
  title: string;
  org: string;
  location: string;
  badge: string;
  icon: IconKey;
  bullets: string[];
};

export type Project = {
  title: string;
  subtitle: string;
  category: string;
  status: string;
  role: string;
  dates: string;
  summary: string;
  tech: string[];
  bullets: string[];
  architecture: string[];
};

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const sectionIds = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const personalInfo = {
  name: 'Thara Sivanandam',
  subtitle: 'M.S. Cybersecurity | Drexel University | GPA 3.89 / 4.0',
  roles: ['Cloud Engineer', 'DevSecOps Engineer', 'Python Developer', 'Cloud Security Analyst'],
  tagline:
    'I deploy, configure, and secure AWS infrastructure - not just study it. 10+ end-to-end AWS environments. 3 automated pipelines. 1 team-wide library adoption. Authorized to work full-time in the U.S. under F-1 OPT.',
  resumeUrl: withBase('Thara_Sivanandam_Resume.pdf'),
  profileIllustration: withBase('assets/thara-cloud-security.webp'),
  stats: [
    { value: '10+', numericValue: 10, suffix: '+', label: 'AWS Labs', sublabel: 'Deployed' },
    { value: '3.89', numericValue: 3.89, decimals: 2, label: 'GPA/4.0', sublabel: 'Drexel' },
    { value: '3', numericValue: 3, label: 'Pipelines', sublabel: 'Automated' },
    { value: 'Dec', label: '2026', sublabel: 'OPT Valid' },
  ] satisfies Stat[],
  ctas: {
    work: 'View My Work',
    resume: 'Download Resume',
  },
  links: {
    email: 'thara0523@gmail.com',
    linkedin: 'https://linkedin.com/in/thara-sivanandam',
    github: 'https://github.com/tharasivanandam',
    location: 'Philadelphia, PA',
  },
};

export const about = {
  headline: "I don't just configure cloud. I understand why.",
  paragraphs: [
    'As an M.S. Cybersecurity graduate from Drexel University (GPA 3.89), I bring a rare combination: the security mindset of a forensics researcher and the deployment fluency of a cloud engineer. I have independently provisioned 10+ complete AWS environments from scratch - not in a guided tutorial, but in timed lab sessions where every misconfigured IAM role or VPC routing error was mine to debug and fix.',
    'During my internship at Global Techno Solutions, I worked on a remote engineering team of 8 as an individual contributor. I did not just write scripts - I identified three pipelines consuming significant engineer time, automated all three, and built a logging library that the team adopted into their shared codebase. That is the kind of contribution I aim to make on day one.',
    'I am currently in Philadelphia, PA, authorized to work full-time in the United States under F-1 OPT. I am actively seeking cloud engineering, DevSecOps, infrastructure operations, or cloud security roles.',
  ],
  quickFacts: [
    { label: 'Location', value: 'Philadelphia, PA' },
    { label: 'Status', value: 'F-1 OPT - Available Now' },
    { label: 'Focus', value: 'Cloud Engineering and DevSecOps' },
    { label: 'Goal', value: 'Full-time role before Dec 2026' },
  ],
  orbitBadges: ['AWS', 'Python', 'IAM', 'CI/CD', 'Forensics', 'DevSecOps'],
};

export const skills = {
  bars: [
    { label: 'Cloud Infrastructure (AWS)', value: 88, color: 'navy' },
    { label: 'Python and Automation', value: 84, color: 'slate' },
    { label: 'Security Engineering', value: 78, color: 'teal' },
    { label: 'Infrastructure as Code', value: 72, color: 'slate' },
    { label: 'DevSecOps / CI/CD', value: 70, color: 'navy' },
    { label: 'Network Security / Forensics', value: 74, color: 'teal' },
  ] satisfies SkillBar[],
  radar: [
    { subject: 'Cloud Architecture', score: 9 },
    { subject: 'Python Development', score: 8 },
    { subject: 'Security Analysis', score: 8 },
    { subject: 'DevOps / CI/CD', score: 7 },
    { subject: 'IaC / Terraform', score: 7 },
    { subject: 'Documentation', score: 9 },
  ],
  badges: {
    Cloud: ['AWS', 'EC2', 'S3', 'IAM', 'VPC', 'Lambda', 'CloudWatch', 'Cognito', 'API Gateway', 'DynamoDB', 'Terraform', 'CloudFormation'],
    Dev: ['Python', 'Bash', 'Java', 'Flask', 'FastAPI', 'REST APIs'],
    Security: ['Wireshark', 'Burp Suite', 'Qualys', 'Scapy', 'IAM Least-Privilege', 'SIEM', 'Incident Response'],
    DevOps: ['GitHub Actions', 'CI/CD', 'Linux', 'Docker', 'IaC', 'DevSecOps'],
  },
};

export const experience: ExperienceEntry[] = [
  {
    date: 'Jan 2026 - Apr 2026',
    title: 'AWS Academy Cloud Foundations',
    org: 'Drexel University',
    location: 'Philadelphia, PA',
    badge: 'Completed 10+ AWS infrastructure deployments across EC2, S3, IAM, VPC, Lambda, and CloudWatch',
    icon: 'cloud',
    bullets: [
      'Provisioned 10+ complete AWS environments from scratch per session - EC2 instances, S3 bucket access policies, IAM roles with least-privilege permissions, and VPC subnet and routing rules - because lab courses provide theory, not deployable skills.',
      'Configured CloudWatch dashboards with custom metrics, threshold-based alarms, and log group filters, replicating the monitoring and alerting setup used by SRE teams in production cloud environments.',
      'Evaluated every lab architecture against the five pillars of the AWS Well-Architected Framework - security, reliability, performance, cost optimisation, and operational excellence - before finalising configurations.',
      'Deployed event-driven Lambda functions triggered via S3 and API Gateway across 3 lab exercises, implementing serverless compute patterns end-to-end.',
      'Analysed Reserved vs. On-Demand vs. Spot instance cost models to justify resource choices, developing cost-aware reasoning applied in engineering team planning sessions.',
    ],
  },
  {
    date: 'May 2025 - Aug 2025',
    title: 'Network Security and Digital Forensics Lab Researcher',
    org: 'Drexel University',
    location: 'Philadelphia, PA',
    badge: 'Solo researcher within a 4-person cohort. Owned all personal workstreams independently.',
    icon: 'shield',
    bullets: [
      'Configured and maintained 5 isolated Linux-based network lab environments for security testing, managing IP addressing, interface settings, and tool installations independently.',
      'Independently designed and executed ARP poisoning and Man-in-the-Middle simulations, implementing 3 validated countermeasures confirmed through follow-up packet captures.',
      'Drafted shared configuration templates tested across all 4 cohort environments - eliminating setup discrepancies and reducing reset time across the remaining 6 lab sessions.',
      'Authored a technical report covering attack procedures, detection methods, and remediation steps - adopted as a reference by the full cohort and cited in 3 peer submissions.',
    ],
  },
  {
    date: 'Jun 2021 - Aug 2021',
    title: 'Python Developer Intern (Remote)',
    org: 'Global Techno Solutions',
    location: 'Chennai, India',
    badge: 'Individual contributor on a remote team of 8. Owned 3 workstreams end-to-end.',
    icon: 'code',
    bullets: [
      'Audited 5 legacy Python modules causing runtime failures across 3 downstream pipelines, identified redundant loops and I/O bottlenecks, and refactored to restore reliability.',
      'Designed and built a modular logging and exception-handling library from scratch, integrated it across the shared codebase - adopted team-wide, cutting average bug diagnosis time.',
      'Automated 3 recurring manual data-processing workflows end-to-end, eliminating all manual effort and freeing team bandwidth for higher-priority development.',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'SafePlay',
    subtitle: 'Cloud-Native Child Safety and Parental Monitoring Platform',
    category: 'Cloud Architecture',
    status: 'MVP In Development',
    role: 'Solo Cloud Architect and Product Owner',
    dates: 'Dec 2025 - Present',
    summary:
      'A production-scoped, multi-service AWS cloud platform for parental monitoring and digital safety. Architected from scratch with security embedded at every layer - not added after the fact.',
    tech: ['AWS Cognito', 'Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudWatch', 'GitHub Actions', 'OAuth2', 'IAM', 'Python'],
    bullets: [
      'Architected the full multi-service AWS platform: Cognito for identity and age verification, Lambda and API Gateway for serverless APIs, DynamoDB for event storage, S3 for media, CloudWatch for monitoring - every service selected and justified by security, cost, and scale requirements.',
      'Designed an IAM permission model using role separation and least-privilege policies, enforced HTTPS-only API Gateway configurations, OAuth2 auth flows, and encryption-at-rest on all DynamoDB tables and S3 buckets.',
      'Specified a complete GitHub Actions CI/CD pipeline covering automated testing and staged deployment to staging and production - documented to a standard ready for team handoff or direct implementation.',
    ],
    architecture: ['Cognito', '->', 'API Gateway', '->', 'Lambda', '->', 'DynamoDB', '|', 'S3', '|', 'CloudWatch'],
  },
  {
    title: 'Sophia',
    subtitle: 'Python-Based Intelligent Virtual Assistant',
    category: 'Python Development',
    status: 'Completed',
    role: 'Solo Developer - Full Lifecycle',
    dates: '2024',
    summary:
      'A fully functional, multi-module Python virtual assistant built from scratch with no framework scaffolding. Demonstrates full software development lifecycle ownership from requirements through production-ready delivery.',
    tech: ['Python', 'NLP', 'Modular Architecture', 'Structured Logging', 'OS APIs', 'Exception Handling'],
    bullets: [
      'Designed and delivered 5 independent modules - OS-level application control, reminder scheduling, to-do list management, NLP-based command parsing, and health symptom logging - within a single modular codebase using component-based architecture.',
      'Implemented a structured logging layer and comprehensive exception handling across all 5 modules, ensuring every runtime failure produced a traceable, actionable error record from the start.',
      'Conducted 3 iterative test-and-debug cycles resolving edge-case failures in NLP parsing and scheduling conflict scenarios - producing a stable application with production-grade fault tracing.',
    ],
    architecture: ['Command Input', '->', 'NLP Parser', '->', 'Module Router', '->', 'OS / Tasks / Health Logs', '|', 'Structured Logging'],
  },
];

export const education = [
  {
    degree: 'Master of Science in Cybersecurity',
    school: 'Drexel University',
    location: 'Philadelphia, PA',
    gpa: '3.89 / 4.0',
    dates: 'Mar 2025 - Sep 2026 (Expected)',
    courses: ['Cloud Security', 'Network Security', 'Infrastructure Management', 'Cryptography', 'Digital Forensics', 'Cyber Law and Policy'],
  },
  {
    degree: 'B.E. in Computer Science and Engineering',
    school: 'Velammal Institute of Technology',
    location: 'Tamil Nadu, India',
    gpa: '3.43 / 4.0',
    dates: 'Oct 2020 - Jun 2024',
    courses: ['Data Structures and Algorithms', 'Operating Systems', 'Computer Networks', 'Database Management', 'Software Engineering'],
  },
];

export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    status: 'Exam Preparation - In Progress 2026',
    colour: '#FF9900',
    note: 'Covers: EC2, S3, IAM, VPC, Lambda, CloudWatch, pricing, security, compliance',
    active: true,
  },
  {
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google via Coursera',
    status: 'Completed - November 2024',
    colour: '#4285F4',
    note: 'Covers: SIEM, incident response, Linux, Python for security, network and cloud security',
    active: false,
  },
];

export const contact = {
  headline: "Let's Talk",
  subheadline:
    'I am actively seeking full-time roles in cloud engineering, DevSecOps, infrastructure operations, and cloud security in the United States. I am available to start immediately and authorized under F-1 OPT. If my background aligns with what your team needs, I would love to connect.',
  subjects: [
    'Job Opportunity - Cloud Engineering',
    'Job Opportunity - DevSecOps',
    'Job Opportunity - Infrastructure Operations',
    'Job Opportunity - Cloud Security',
    'Job Opportunity - IT Operations',
    'General Inquiry',
  ],
  web3forms: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '263fa080-7ecd-45e0-9457-9b35afaa6916',
  },
};

export const footer = {
  copyright: '\u00a9 2026 Thara Sivanandam. All rights reserved.',
  builtWith: 'Built with Passion',
};
