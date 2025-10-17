#!/usr/bin/env bash
set -euo pipefail
MONDIR="$1"
WWWROOT="/var/www/html/monitor/$(basename "$MONDIR")"
mkdir -p "$MONDIR"
mkdir -p "$WWWROOT"
chown -R asterisk:asterisk "$MONDIR" "$WWWROOT" || true
chmod 0755 "$MONDIR" "$WWWROOT"
# Optionally create a watcher to hardlink finished recordings from $MONDIR to $WWWROOT
