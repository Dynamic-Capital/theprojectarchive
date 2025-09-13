# The Project Archive

This repository contains the marketing site for The Project Archive, a creative studio based in the Maldives. The site is built with [Next.js](https://nextjs.org/) and animated with [Framer Motion](https://www.framer.com/motion/). It now also supports simple 3D scenes via [Three.js](https://threejs.org/) and [@react-three/fiber](https://github.com/pmndrs/react-three-fiber).

Global CSS is processed during the build using PostCSS.

A high-level overview of the application features and data model is available in [docs/project-overview.md](docs/project-overview.md).


## Getting Started

Install dependencies:

```bash
npm install
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

### Google Business email setup

Contact form submissions are processed by a Supabase Edge Function which saves
them to the database and forwards the message to your Google Business inbox.

1. Generate an App Password at <https://myaccount.google.com/apppasswords> for
   your Workspace mailbox.
2. Configure the `save-contact` function with your mailbox credentials:

   ```bash
   supabase secrets set BUSINESS_EMAIL=studio@example.com \
     BUSINESS_EMAIL_APP_PASSWORD=your_app_password
   ```
3. Add the function details to your `.env` so the Next.js API can call it:

   ```bash
   SUPABASE_SAVE_CONTACT_FUNCTION_URL=https://<project>.functions.supabase.co/save-contact
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   # Optional: enable spam protection with reCAPTCHA v3
   RECAPTCHA_SECRET=your_recaptcha_secret
   ```
4. Restart the dev server and verify the endpoint locally:

   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H 'Content-Type: application/json' \
     -d '{"name":"Test","email":"user@example.com","message":"Hello"}'
     ```
     A `200` response indicates the message was accepted and forwarded to your inbox.

     The endpoint applies basic rate limiting (5 requests per minute per IP) to prevent abuse.

### Supabase storage

Contact form submissions are also saved in Supabase. Configure the Supabase table,
Row Level Security policy, and required environment variables as described in
[docs/supabase-integration.md](docs/supabase-integration.md).

Service images are loaded from a Supabase Storage bucket defined by
`NEXT_PUBLIC_SUPABASE_BUCKET`. Images can be uploaded via the `/api/images`
route, which returns the public URL and invalidates the cached metadata.

### Analytics

Page views and marketing events are tracked with Supabase Edge Functions.
Events are stored in the `analytics_logs` table and can be summarized via
the `analytics-report` function.

### Database

The application now uses a PostgreSQL database for persistent storage. Configure the
connection in `.env`:

```
DATABASE_URL=postgres://tpa:tpa@localhost:5432/tpa
DATABASE_POOL_MAX=10
DATABASE_SSL=false
```

Apply database migrations after installing dependencies:

```
npm run migrate
```

## Development

Install dependencies and start the development server:

```bash
npm install
cp .env.example .env
npm run migrate
npm run dev
```

Ensure Node.js 20 is installed (a `.nvmrc` file is provided for `nvm` users). Run linting and tests together with:

```bash
npm run check
```

Update `ALLOWED_ORIGINS`, `SPACE_BUCKET_URL`, `SITE_URL`,
`NEXT_PUBLIC_SITE_URL`, search-engine verification tokens
(`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`,
`NEXT_PUBLIC_BING_SITE_VERIFICATION`),
`MAINTENANCE_MODE`, `NEXT_PUBLIC_SUPABASE_BUCKET`, and
`SUPABASE_SAVE_CONTACT_FUNCTION_URL` in `.env` to match your environment.
`SITE_URL` is required. `NEXT_PUBLIC_SITE_URL` defaults to
`http://localhost:3000` but should be set in production.

`ALLOWED_ORIGINS` restricts incoming requests to the specified origins
(comma-separated) and is enforced in `server.js`.

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting and tests
via `npm run check` on pushes and pull requests to ensure code quality.

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

The hero section features a cat mascot with animated curved text tickers. Animations respect the user's `prefers-reduced-motion` setting and pause when motion is reduced.

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

The `k8s/postgres.yaml` manifest provisions a PostgreSQL database with a persistent volume. Credentials are supplied via `k8s/postgres-secret.yaml`, and `k8s/postgres-networkpolicy.yaml` restricts database access to the application pods. The app deployment (`k8s/deployment.yaml`) uses these values to form the `DATABASE_URL` environment variable.

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
- `SITE_URL` – base URL of the deployed site. **Required.**
- `NEXT_PUBLIC_SITE_URL` – base URL used for metadata, sitemap, and robots. Defaults to `http://localhost:3000`.

## Security Features

- **SSL Certificate** – Authenticates the site’s identity and enables an encrypted connection.
- **TLS 1.3 Encryption** – Encrypts data using the latest industry-standard protocols.
- **DDoS Protection** – Reroutes malicious traffic to keep the site accessible.
- **Level 1 PCI Compliance** – Meets the highest global standard for secure online payments.

## Uptime Monitoring

Use the `scripts/uptime-monitor.js` script to check site availability and verify basic security headers:

```bash
node scripts/uptime-monitor.js https://example.com
# or use the SITE_URL environment variable
SITE_URL=https://example.com npm run uptime
```

The script issues a `HEAD` request (falling back to `GET` if necessary), reports the HTTP status and response time, and warns about missing security headers.

## Accessibility

Animated components respect the user's `prefers-reduced-motion` setting, and the lightbox dialog traps focus for keyboard users.
