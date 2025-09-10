# The Project Archive

This repository contains the marketing site for The Project Archive, a creative studio based in the Maldives. The site is built with [Next.js](https://nextjs.org/) and animated with [Framer Motion](https://www.framer.com/motion/). It now also supports simple 3D scenes via [Three.js](https://threejs.org/) and [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), animated with [framer-motion-3d](https://github.com/pmndrs/react-three-fiber).

Tailwind CSS is compiled during the build using PostCSS instead of a CDN runtime.

## Development

Install dependencies and start the development server:

```bash
npm install
cp .env.example .env
npm run dev
```

Update `NEXT_ALLOWED_ORIGIN` and `SPACE_BUCKET_URL` in `.env` to match your environment.

## Production build

Create an optimized production build in the `out` folder and sync it to the top-level `_static` directory:

```bash
npm run build
```

To rebuild automatically when files in `app/` change and refresh `_static`:

```bash
npm run watch-static
```

## 3D Animation

The hero section showcases a rotating 3D cube using `three`, `@react-three/fiber`, and `framer-motion-3d`. Animations respect the user's `prefers-reduced-motion` setting and fall back to a static placeholder when motion is reduced. Import `Hero3D` into any component to render the scene.

## Docker

A multi-stage `Dockerfile` builds the site and serves the generated `out` directory
with Nginx. Build and run the production container locally:

```bash
# Build the image
docker build -t tpa-site .

# Run the container and map port 80 to 8080 on the host
docker run --rm -p 8080:80 tpa-site
```

## Deployment

GitHub Actions in `.github/workflows/deploy.yml` builds the site and deploys the `out/` directory to a DigitalOcean Droplet via SCP. Configure the following secrets in your repository settings:

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
relative to the build context. If not set, App Platform will automatically scan for
these directory names: `_static`, `dist`, `public`, `build`.

### Kubernetes

Manifests for running the site in a Kubernetes cluster are in `k8s/`. Build and push the container image and apply the manifests with:

```bash
./scripts/deploy-k8s.sh registry.digitalocean.com/<registry>/tpa-site:latest
```

Ensure `kubectl` is configured for your cluster and you are authenticated to the container registry.

The workflow `.github/workflows/deploy-k8s.yml` automates this process. Configure these secrets:

- `DO_API_TOKEN` – DigitalOcean API token
- `DO_REGISTRY` – Container registry name
- `DO_K8S_CLUSTER` – Kubernetes cluster name or ID

## Buildpack Deployment

The site can be built and deployed using [Paketo Buildpacks](https://paketo.io/). The `project.toml` configures both the Node.js runtime and an Nginx web server so the static files in `out/` are served automatically.

```toml
[[build.buildpacks]]
id = "paketo-buildpacks/nodejs-legacy"

[[build.buildpacks]]
id = "paketo-buildpacks/web-servers"

[[build.env]]
BP_NODE_VERSION = "18.x"
BP_WEB_SERVER = "nginx"
BP_WEB_SERVER_ROOT = "out"
```

When deploying to platforms like DigitalOcean App Platform, the `.do/app.yaml` file lists both buildpacks so the build image includes Nginx to serve the contents of `out/`.

The `npm start` script runs the Next.js server for local preview.

### Environment variables

- `BP_NODE_VERSION` – Node runtime used during build (e.g., `18.x`).
- `BP_WEB_SERVER` – web server to run (e.g., `nginx`).
- `BP_WEB_SERVER_ROOT` – directory containing built assets (`out`).
- `NODE_ENV` – set to `production` for optimized runtime behavior.

## Accessibility

Animated components respect the user's `prefers-reduced-motion` setting, and the lightbox dialog traps focus for keyboard users.

