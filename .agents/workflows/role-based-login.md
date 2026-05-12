# Workflow: VoiceMed Family Auth

Purpose: keep prototype auth simple for family users.

Steps:

1. Inspect `src/lib/auth-context.tsx`.
2. Use `owner`, `caregiver`, `viewer`.
3. Public pages remain accessible without auth.
4. Protected pages redirect to landing if logged out.
5. Demo CTA logs in as `owner`.

Acceptance:

- Landing is public.
- Checkout can start trial and go onboarding.
- Dashboard shows family account context.
