#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <image>"
  echo "  image: full image name, e.g. registry.digitalocean.com/registry/tpa-site:latest"
}

if [ "$#" -ne 1 ]; then
  usage
  exit 1
fi

IMAGE="$1"

echo "Building $IMAGE"
docker build -t "$IMAGE" .

echo "Pushing $IMAGE"
docker push "$IMAGE"

echo "Applying manifests"
export IMAGE
envsubst < k8s/deployment.yaml | kubectl apply -f -
kubectl apply -f k8s/service.yaml
if [ -f k8s/ingress.yaml ]; then
  kubectl apply -f k8s/ingress.yaml
fi

