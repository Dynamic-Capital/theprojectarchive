# DigitalOcean App Logs Integration

This guide outlines how to integrate and manage logs for applications running on DigitalOcean App Platform. It mirrors the eight-step plan used during development.

## 1. Determine Logging Requirements
- Identify which components (build, deploy, runtime, crash) need monitoring.
- Decide on log retention and compliance needs.

## 2. Access Configuration
- **CLI**: Install [`doctl`](https://docs.digitalocean.com/reference/doctl/how-to/install/) and run `doctl auth init` with a personal access token.
- **API**: Create a token and export it as `DIGITALOCEAN_TOKEN`.

## 3. Log Retrieval Automation
- **CLI script**: `scripts/do-app-logs.sh` wraps `doctl apps logs`.
  ```bash
  ./scripts/do-app-logs.sh <app-id> [component] [type]
  ```
- **API script**: `scripts/do-app-logs.js` pulls logs via the REST API.
  ```bash
  DIGITALOCEAN_TOKEN=... node scripts/do-app-logs.js <app-id> <deployment-id> <component> [--type run] [--stream]
  ```

## 4. Streaming Live Logs
Passing `--stream` to `scripts/do-app-logs.js` opens the `live_url` WebSocket and streams new log entries to stdout.

## 5. Centralized Storage & Analysis
Pipe script output to log aggregators such as Elasticsearch, Grafana Loki, or third‑party services for long‑term storage and querying.

## 6. Monitoring & Alerts
Set up alerts in your monitoring stack (Prometheus, Datadog, etc.) to watch for error rates, crash counts, or specific log patterns.

## 7. Security & Compliance
- Restrict token scopes to logging requirements.
- Store tokens in secret managers and use TLS when transmitting logs.
- Redact sensitive information before forwarding logs.

## 8. Documentation & Maintenance
Document operational procedures, rotate access tokens regularly, and review log retention and alert thresholds to keep them relevant.
