#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <environment> <access_token>"
  echo "  environment: deployment target (e.g. staging or production)"
  echo "  access_token: DigitalOcean API token"
}

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi

ENVIRONMENT="$1"
ACCESS_TOKEN="$2"

export DIGITALOCEAN_ACCESS_TOKEN="$ACCESS_TOKEN"

# Environment variable that holds the app ID, e.g., DO_APP_ID_PRODUCTION
ENV_VAR="DO_APP_ID_${ENVIRONMENT^^}"
APP_ID="${!ENV_VAR-}"

CMD="doctl apps"
SPEC="--spec .do/app.yaml"

if [ -n "$APP_ID" ]; then
  echo "Updating app $APP_ID for environment $ENVIRONMENT"
  $CMD update "$APP_ID" $SPEC
else
  echo "Creating new app for environment $ENVIRONMENT"
  $CMD create $SPEC
fi

