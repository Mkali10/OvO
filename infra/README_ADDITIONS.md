Click-to-call / API-based calling (CRM integration):
Third-party CRMs can trigger calls by POSTing to /api/originate. Use HMAC signing with the shared secret and pass from and to in the JSON body. See web/frontend/crm-click2call.js for an example embed.

Dialing Modes:
You can configure the dialer mode in infra/dialer_config.yml. Modes supported: manual, progressive, predictive.
