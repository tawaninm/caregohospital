# Workflow: Future Express API

Purpose: gradually replace frontend mock data.

Steps:

1. Add Express TypeScript API only when requested.
2. Keep frontend mock fallback.
3. Add `/api/health`.
4. Add family account, elder profile, bot config, call log, alert, report endpoints.
5. Validate with Zod.
6. Authorize by family role.

Acceptance:

- No UI break if API unavailable.
- No secrets exposed.
