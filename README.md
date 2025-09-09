# The Project Archive

This repository contains the marketing site for The Project Archive, a creative studio based in the Maldives. The site has been converted into a React application powered by [Vite](https://vitejs.dev/) and animated with [Framer Motion](https://www.framer.com/motion/).

Tailwind CSS is compiled during the build using PostCSS instead of a CDN runtime.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

## Production build

Create an optimized production build in the `dist` folder:

```bash
npm run build
```

## Docker

Build and run the production container locally:

```bash
docker build -t tpa-site .
docker run -p 8080:80 tpa-site
```

## Deployment

GitHub Actions in `.github/workflows/deploy.yml` builds the site and deploys the `dist/` directory to a DigitalOcean Droplet via SCP. Configure the following secrets in your repository settings:

- `DO_SSH_HOST` – Droplet IP or hostname
- `DO_SSH_USER` – SSH user
- `DO_SSH_KEY` – Private key for the user
- `DO_DEPLOY_PATH` – Target path on the Droplet

Optional assets can be served from a DigitalOcean Space; see `.env.example` for configuration.
