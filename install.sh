#!/usr/bin/env bash
set -euo pipefail

# === Detect OS & Compose version ===
if ! command -v docker &>/dev/null; then
  echo "Installing Docker..."
  sudo apt update
  sudo apt install -y docker.io
  sudo systemctl enable --now docker
fi

# Check if compose plugin exists
if ! docker compose version &>/dev/null; then
  echo "Installing Docker Compose plugin..."
  sudo apt install -y docker-compose-plugin
fi

# === Clone repo only if needed ===
TARGET_DIR=~/ai-dialer
if [ ! -d "$TARGET_DIR" ]; then
  echo "Cloning dialer repo..."
  git clone https://github.com/Mkali/OvO.git "$TARGET_DIR"
else
  echo "Repo already exists at $TARGET_DIR"
fi

cd "$TARGET_DIR/infra" || { echo "infra/ folder missing"; exit 1; }

# === Prepare .env file ===
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "Created .env from template. Please edit it before proceeding."
  else
    echo "No .env or .env.example found."
    exit 1
  fi
else
  echo ".env already exists"
fi

# === Run main installation ===
if [ -f installation.sh ]; then
  echo "Running main installation..."
  sudo bash installation.sh full
else
  echo "installation.sh not found in $(pwd)"
  exit 1
fi

