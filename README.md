# Thara Sivanandam Portfolio

Recruiter-facing React portfolio for Thara Sivanandam, an M.S. Cybersecurity graduate and Cloud/DevSecOps engineer.

Live site: [https://tharasivanandam.github.io/tharasivanandam/](https://tharasivanandam.github.io/tharasivanandam/)

## Tech Stack

- React 18 with Vite and TypeScript
- Tailwind CSS v3
- Framer Motion
- React Router hash routing
- Recharts
- tsParticles
- Web3Forms contact form

## Local Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the app on pushes to `main` and publishes `dist` to GitHub Pages through `peaceiris/actions-gh-pages`.

Manual deployment is also available:

```bash
npm run deploy
```

The contact form submits through Web3Forms. Update `src/data/resume.ts` if the Web3Forms access key changes.
