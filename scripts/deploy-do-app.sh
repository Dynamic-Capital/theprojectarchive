#!/usr/bin/env bash
set -euo pipefail

if ! command -v doctl >/dev/null 2>&1; then
  echo "Error: doctl is required" >&2
  exit 1
fi

if [ $# -ne 2 ]; then
  echo "Usage: $0 <environment> <access_token>" >&2
  exit 1
fi

ENVIRONMENT="$1"
TOKEN="$2"
ENV_UPPER=$(printf '%s' "$ENVIRONMENT" | tr '[:lower:]' '[:upper:]')
APP_ID_VAR="DO_APP_ID_${ENV_UPPER}"
APP_ID="${!APP_ID_VAR:-}"

doctl auth init -t "$TOKEN" >/dev/null 2>&1

if [ -n "$APP_ID" ]; then
  echo "Updating DigitalOcean App $APP_ID"
  doctl apps update "$APP_ID" --spec .do/app.yaml
else
  echo "Creating DigitalOcean App"
  APP_ID=$(doctl apps create --spec .do/app.yaml --format ID --no-header)
  echo "Created App with ID: $APP_ID"
fi

