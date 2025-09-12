#!/usr/bin/env bash
set -euo pipefail

if ! command -v doctl >/dev/null 2>&1; then
  echo "Error: doctl is required" >&2
  exit 1
fi

usage() {
  echo "Usage: $0 <app-id-or-name> [component] [type]" >&2
  echo "  component: optional component name (defaults to all components)" >&2
  echo "  type: build|deploy|run|run_restarted (defaults to run)" >&2
}

if [ $# -lt 1 ]; then
  usage
  exit 1
fi

APP_ID="$1"
COMPONENT="${2:-}"
TYPE="${3:-run}"

# shellcheck disable=SC2086
doctl apps logs "$APP_ID" $COMPONENT --type "$TYPE"
