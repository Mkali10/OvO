#!/usr/bin/env bash
set -euo pipefail

# Install dependencies
sudo apt update
sudo apt install -y git docker.io docker-compose unzip curl nodejs npm

# Clone this repo
git clone https://github.com/USERNAME/ai-dialer.git ~/ai-dialer
cd ~/ai-dialer/infra

# Copy sample .env
cp .env .env.example || true
echo "Edit .env to set your API keys and passwords"

# Run the main installation script
sudo bash installation.sh full
