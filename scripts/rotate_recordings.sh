#!/usr/bin/env bash
# rotate old recordings (example)
find /var/spool/asterisk/monitor -type d -mtime +30 -print0 | xargs -0 -I{} rm -rf {}
