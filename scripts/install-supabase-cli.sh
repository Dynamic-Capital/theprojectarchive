#!/usr/bin/env bash
set -euo pipefail

# Directory to install Supabase CLI binaries
BIN_DIR="${1:-./bin}"

mkdir -p "$BIN_DIR"

# Download and install Supabase CLI to the specified directory
curl -fsSL https://cli.supabase.com/install.sh | sh -s -- -b "$BIN_DIR"

echo "Supabase CLI installed to $BIN_DIR. Add it to your PATH to use it globally."
