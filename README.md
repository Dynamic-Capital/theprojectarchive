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

### DigitalOcean App Platform

Use `scripts/deploy-do-app.sh` to deploy the app to DigitalOcean App Platform with `doctl`:

```bash
./scripts/deploy-do-app.sh <environment> <access_token>
```

The script checks `DO_APP_ID_<ENV>` for an existing App Platform ID. If set, the app is updated; otherwise a new one is created using `.do/app.yaml`.

## Buildpack Deployment

The site can be built and deployed using [Paketo Buildpacks](https://paketo.io/). The `project.toml` configures both the Node.js runtime and an Nginx web server so the static files in `dist/` are served automatically.

```toml
[[build.buildpacks]]
id = "paketo-buildpacks/nodejs-legacy"

[[build.buildpacks]]
id = "paketo-buildpacks/web-servers"

[[build.env]]
BP_NODE_VERSION = "18.x"
BP_WEB_SERVER = "nginx"
BP_WEB_SERVER_ROOT = "dist"
```

When deploying to platforms like DigitalOcean App Platform, the `.do/app.yaml` file lists both buildpacks so the build image includes Nginx to serve the contents of `dist/`.

The `npm start` script builds the project and serves the generated `dist/` directory using `npx serve`, enabling local preview or platforms that rely on `npm start`.

### Environment variables

- `BP_NODE_VERSION` – Node runtime used during build (e.g., `18.x`).
- `BP_WEB_SERVER` – web server to run (e.g., `nginx`).
- `BP_WEB_SERVER_ROOT` – directory containing built assets (`dist`).
- `NODE_ENV` – set to `production` for optimized runtime behavior.

