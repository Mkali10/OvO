#!/usr/bin/env bash
set -euo pipefail
# installation.sh - Docker Compose based installer for Dialer project
# Usage: ./installation.sh [minimal|full]
MODE=${1:-full}
REPO_DIR=$(cd "$(dirname "$0")/.." && pwd)
COMPOSE_ACTIVE="${REPO_DIR}/infra/docker-compose.active.yml"
ENV_FILE="${REPO_DIR}/infra/.env"

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

echo "Using repo dir: ${REPO_DIR}"

# Install docker if not present (basic for Debian/Ubuntu)
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found, installing..."
  if [ -f /etc/debian_version ]; then
    apt-get update
    apt-get install -y ca-certificates curl gnupg lsb-release
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  else
    curl -fsSL https://get.docker.com | sh
  fi
fi

# Create mounts
mkdir -p /var/spool/asterisk/monitor
mkdir -p /var/www/html/monitor
chown -R ${ASTERISK_UID:-1000}:${ASTERISK_GID:-1000} /var/spool/asterisk/monitor /var/www/html/monitor || true
chmod -R 0755 /var/spool/asterisk/monitor /var/www/html/monitor

# choose compose
if [ "${MODE}" = "minimal" ]; then
  cp "${REPO_DIR}/infra/docker-compose.min.yml" "${COMPOSE_ACTIVE}"
else
  cp "${REPO_DIR}/infra/docker-compose.yml" "${COMPOSE_ACTIVE}"
fi

# export env
export $(grep -v '^#' "${ENV_FILE}" | xargs)

# Start stack
cd "${REPO_DIR}/infra"
docker compose -f docker-compose.active.yml pull --quiet || true

docker compose -f docker-compose.active.yml up -d --remove-orphans

echo "Done. Services starting. Check 'docker compose -f ${COMPOSE_ACTIVE} ps'"
echo "Edit infra/.env to set secrets and restart with './installation.sh full'"
