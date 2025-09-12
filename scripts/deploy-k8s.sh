#!/usr/bin/env bash
set -euo pipefail

# Prerequisites: docker, envsubst, kubectl and valid authentication
for cmd in docker envsubst kubectl; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Error: $cmd is required" >&2
    exit 1
  fi
done

if ! docker info >/dev/null 2>&1; then
  echo "Error: docker is not running or not authenticated" >&2
  exit 1
fi

if ! kubectl config current-context >/dev/null 2>&1; then
  echo "Error: kubectl is not configured" >&2
  exit 1
fi

usage() {
  echo "Usage: $0 <image> <host>"
  echo "  image: full image name, e.g. registry.digitalocean.com/registry/tpa-site:latest"
  echo "  host: ingress host domain"
}

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi

IMAGE="$1"
INGRESS_HOST="$2"

if [ ! -d "_static/_next" ]; then
  echo "Error: build output missing. Run 'npm run export' before deploying." >&2
  exit 1
fi

echo "Building $IMAGE"
docker build -t "$IMAGE" .

echo "Pushing $IMAGE"
docker push "$IMAGE"

echo "Applying manifests"
export IMAGE INGRESS_HOST
envsubst < k8s/deployment.yaml | kubectl apply -f -
kubectl apply -f k8s/service.yaml
if [ -f k8s/ingress.yaml ]; then
  envsubst < k8s/ingress.yaml | kubectl apply -f -
fi

