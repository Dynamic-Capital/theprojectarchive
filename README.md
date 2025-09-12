# The Project Archive

This repository contains the marketing site for The Project Archive, a creative studio based in the Maldives. The site is built with [Next.js](https://nextjs.org/) and animated with [Framer Motion](https://www.framer.com/motion/). It now also supports simple 3D scenes via [Three.js](https://threejs.org/) and [@react-three/fiber](https://github.com/pmndrs/react-three-fiber).

Global CSS is processed during the build using PostCSS.


## Getting Started

Install the required packages:

```bash
npm install framer-motion tailwindcss @tailwindcss/postcss
```

### Usage

```jsx
import ServicesStack from "./components/ServicesStack";

const services = [
  { title: "Portrait Photography", description: "Professional headshots and portrait sessions." },
  { title: "Event Coverage", description: "Document corporate events or family gatherings with style." },
  { title: "Product Shoots", description: "Clean and vibrant images to showcase your products online.", cta: "Get a quote", href: "#contact" }
];

<ServicesStack items={services} />
```

The component respects the user's `prefers-reduced-motion` setting and falls back to a simple list when motion is disabled.


## Development

Install dependencies and start the development server:

```bash
npm install
cp .env.example .env
npm run dev
```

Ensure Node.js 20 is installed (a `.nvmrc` file is provided for `nvm` users). Run linting and tests together with:

```bash
npm run check
```

Update `ALLOWED_ORIGINS`, `SPACE_BUCKET_URL`, `NEXT_PUBLIC_SITE_URL`, and `MAINTENANCE_MODE` in `.env` to match your environment.

`ALLOWED_ORIGINS` restricts incoming requests to the specified origins (comma-separated) and is enforced in `server.js`.

## Maintenance mode

Set `MAINTENANCE_MODE=true` to redirect all traffic to `/coming-soon`. The middleware in `next-app/middleware.ts` reads `process.env.MAINTENANCE_MODE`, similar to how `next-app/next.config.mjs` uses `SPACE_BUCKET_URL`.

## Design Tokens

Spacing, radii, typography, and color tokens are defined as CSS custom properties in `next-app/styles/tokens.css` and applied globally via `next-app/styles/globals.css`. Reference these variables (e.g., `var(--space-4)`, `var(--radius-md)`, `var(--fs-2)`) throughout components for consistent styling.

## Production build

Create an optimized production build and generate the static site in `/_static/`:

```bash
npm run build
```

After building, the app can be started with the Node.js server:

```bash
npm run start
```

To build and start the app in one step for a local production preview:

```bash
npm run preview
```

`npm run export` is an alias for `npm run build`.

To rebuild automatically when files in `app/` change and refresh the local
`/_static/` directory:

```bash
npm run watch-static
```

To inspect bundle sizes and locate large dependencies, run:

```bash
npm run analyze
```
This runs `next build` with `ANALYZE=true` so `@next/bundle-analyzer` generates an interactive report.

## 3D Animation

The hero section showcases a rotating 3D cube using `three` and `@react-three/fiber`. Animations respect the user's `prefers-reduced-motion` setting and fall back to a static placeholder when motion is reduced. Import `Hero3D` into any component to render the scene.

## Docker

The multi-stage `Dockerfile` builds the app and runs it with a Node.js
server. Build and run the production container locally:

```bash
# Build the image
docker build -t tpa-site .

# Run the container and map port 3000 to 3000 on the host
docker run --rm -p 3000:3000 tpa-site
```

## Deployment

GitHub Actions in `.github/workflows/deploy.yml` builds the site and deploys the `/_static/` directory to a DigitalOcean Droplet via SCP. Configure the following secrets in your repository settings:

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

#### App Logs

Logging for App Platform deployments is covered in [docs/digitalocean-app-logs.md](docs/digitalocean-app-logs.md). The guide includes helper scripts for fetching build, deploy, runtime, and crash logs via both `doctl` and the REST API.

#### Output Directory

The output directory is an optional path to where the build assets will be located,
relative to the build context. This project writes its static build to `/_static/`. If not set,
App Platform will automatically scan for these directory names: `/_static`, `dist`, `public`, `build`.

### Kubernetes

Manifests for running the site in a Kubernetes cluster are in `k8s/`. Build and push the container image and apply the manifests with:

```bash
./scripts/deploy-k8s.sh registry.digitalocean.com/<registry>/tpa-site:latest <your-domain>
```

The second argument sets `INGRESS_HOST`, which replaces `${INGRESS_HOST}` in `k8s/ingress.yaml` via `envsubst`.

Ensure `kubectl` is configured for your cluster and you are authenticated to the container registry.

The deployment sets modest CPU/memory requests (`100m`/`128Mi`) and limits (`200m`/`256Mi`) and exposes liveness and readiness probes on the root path.

The workflow `.github/workflows/deploy-k8s.yml` automates this process. Configure these secrets:

- `DO_API_TOKEN` – DigitalOcean API token
- `DO_REGISTRY` – Container registry name
- `DO_K8S_CLUSTER` – Kubernetes cluster name or ID

## Buildpack Deployment

The site can be built and deployed using [Paketo Buildpacks](https://paketo.io/). The `project.toml` configures both the Node.js runtime and an Nginx web server so the static files in `/_static/` are served automatically.

```toml
[[build.buildpacks]]
id = "paketo-buildpacks/nodejs"

[[build.buildpacks]]
id = "paketo-buildpacks/web-servers"

[[build.env]]
BP_NODE_VERSION = "20.x"
BP_WEB_SERVER = "nginx"
BP_WEB_SERVER_ROOT = "/_static"
BP_NODE_RUN_SCRIPTS = "export"
```

When deployed to platforms like DigitalOcean App Platform, the buildpacks install dependencies, run the `export` script to generate the static site, and launch Nginx to serve the built assets.

### Environment variables

- `BP_NODE_VERSION` – Node runtime used during build (e.g., `20.x`).
- `BP_WEB_SERVER` – web server to run (e.g., `nginx`).
- `BP_WEB_SERVER_ROOT` – directory containing built assets (`/_static`).
- `BP_NODE_RUN_SCRIPTS` – npm scripts to run during build (`export`).
- `NODE_ENV` – set to `production` for optimized runtime behavior.
- `MAINTENANCE_MODE` – set to `true` to redirect users to `/coming-soon`.
- `NEXT_PUBLIC_SITE_URL` – base URL used for metadata, sitemap, and robots.

## Accessibility

Animated components respect the user's `prefers-reduced-motion` setting, and the lightbox dialog traps focus for keyboard users.
