# Dialer Project

Starter scaffold for a dialer with Asterisk, Kamailio, AI integration, monitoring (Prometheus/Grafana), recordings mirrored to /var/www/html, and a Docker-first installer.

## Quick start
1. Edit `infra/.env` and set secrets (POSTGRES_PASSWORD, OPENAI_API_KEY, WHATSAPP credentials).
2. Run as root: `sudo infra/installation.sh full` (or `minimal`).
3. Wait for containers to start. Admin UI at `http://<host>:8080`.

## Notes
- Asterisk recordings stored at `/var/spool/asterisk/monitor/YYYYMMDD` and mirrored to `/var/www/html/monitor/YYYYMMDD`.
- Admin-only endpoints guarded by JWT & role checks (backend stubbed).
- This scaffold uses Docker Compose for cross-OS compatibility.
