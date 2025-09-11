# The Project Archive

This repository contains the marketing site for The Project Archive, a creative studio based in the Maldives. The site is built with [Next.js](https://nextjs.org/) and animated with [Framer Motion](https://www.framer.com/motion/). It now also supports simple 3D scenes via [Three.js](https://threejs.org/) and [@react-three/fiber](https://github.com/pmndrs/react-three-fiber).

Global CSS is processed during the build using PostCSS.

## Development

Install dependencies and start the development server:

```bash
npm install
cp .env.example .env
npm run dev
```

Update `NEXT_ALLOWED_ORIGIN`, `SPACE_BUCKET_URL`, and `MAINTENANCE_MODE` in `.env` to match your environment.

## Maintenance mode

Set `MAINTENANCE_MODE=true` to redirect all traffic to `/coming-soon`. The middleware in `next-app/middleware.ts` reads `process.env.MAINTENANCE_MODE`, similar to how `next-app/next.config.mjs` uses `SPACE_BUCKET_URL`.

## Design Tokens

Spacing, radii, typography, and color tokens are defined as CSS custom properties in `next-app/styles/tokens.css` and applied globally via `next-app/styles/globals.css`. Reference these variables (e.g., `var(--space-4)`, `var(--radius-md)`, `var(--fs-2)`) throughout components for consistent styling.

## Production build

Create an optimized production build in the repository's `_static` folder, which is excluded from version control:

```bash
npm run build
```

After building, preview the static site locally:

```bash
npm run start
```

To rebuild automatically when files in `app/` change and refresh the local `_static/` directory:

```bash
npm run watch-static
```

## Next.js build helpers

Run a standard Next.js production server build:

```bash
npm run build:standalone
npm run start:standalone
```

The build sets `NEXT_STANDALONE=true`, producing a `.next/standalone` directory with only the files needed to run the app, ideal for Docker or PM2 deployments.

To inspect bundle sizes and locate large dependencies, run:

```bash
npm run analyze
```

This enables `@next/bundle-analyzer` when `ANALYZE=true` is present during `next build`.

## 3D Animation

The hero section showcases a rotating 3D cube using `three` and `@react-three/fiber`. Animations respect the user's `prefers-reduced-motion` setting and fall back to a static placeholder when motion is reduced. Import `Hero3D` into any component to render the scene.

## Docker

A multi-stage `Dockerfile` builds the site and serves the generated `_static` directory
with Nginx. Build and run the production container locally:

```bash
# Build the image
docker build -t tpa-site .

# Run the container and map port 80 to 8080 on the host
docker run --rm -p 8080:80 tpa-site
```

## Deployment

GitHub Actions in `.github/workflows/deploy.yml` builds the site and deploys the `_static/` directory to a DigitalOcean Droplet via SCP. Configure the following secrets in your repository settings:

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

#### Output Directory

The output directory is an optional path to where the build assets will be located,
relative to the build context. This project writes its static build to `_static/`. If not set,
App Platform will automatically scan for these directory names: `_static`, `dist`, `public`, `build`.

### Kubernetes

Manifests for running the site in a Kubernetes cluster are in `k8s/`. Build and push the container image and apply the manifests with:

```bash
./scripts/deploy-k8s.sh registry.digitalocean.com/<registry>/tpa-site:latest
```

Ensure `kubectl` is configured for your cluster and you are authenticated to the container registry.

The deployment sets modest CPU/memory requests (`100m`/`128Mi`) and limits (`200m`/`256Mi`) and exposes liveness and readiness probes on the root path.

The workflow `.github/workflows/deploy-k8s.yml` automates this process. Configure these secrets:

- `DO_API_TOKEN` – DigitalOcean API token
- `DO_REGISTRY` – Container registry name
- `DO_K8S_CLUSTER` – Kubernetes cluster name or ID

## Buildpack Deployment

The site can be built and deployed using [Paketo Buildpacks](https://paketo.io/). The `project.toml` configures both the Node.js runtime and an Nginx web server so the static files in `_static/` are served automatically.

```toml
[[build.buildpacks]]
id = "paketo-buildpacks/nodejs-legacy"

[[build.buildpacks]]
id = "paketo-buildpacks/web-servers"

[[build.env]]
BP_NODE_VERSION = "18.x"
BP_WEB_SERVER = "nginx"
BP_WEB_SERVER_ROOT = "_static"
```

When deploying to platforms like DigitalOcean App Platform, the `.do/app.yaml` file lists both buildpacks so the build image includes Nginx to serve the contents of `_static/`.

The `npm start` script serves the contents of `_static/` locally using `serve`.

### Environment variables

- `BP_NODE_VERSION` – Node runtime used during build (e.g., `18.x`).
- `BP_WEB_SERVER` – web server to run (e.g., `nginx`).
- `BP_WEB_SERVER_ROOT` – directory containing built assets (`_static`).
- `NODE_ENV` – set to `production` for optimized runtime behavior.
- `MAINTENANCE_MODE` – set to `true` to redirect users to `/coming-soon`.

## Accessibility

Animated components respect the user's `prefers-reduced-motion` setting, and the lightbox dialog traps focus for keyboard users.
