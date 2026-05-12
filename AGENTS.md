# AGENTS.md

Future AI coding agents must read this file first before editing the repository.

## Repository Truth

This repository is now **VoiceMed**, a B2C AI Voice Companion subscription platform for families caring for elderly relatives. The old CareGo Hospital direction has been superseded by VoiceMed v0.2.0.

Current app reality:

- Vite + TanStack Router + React + TypeScript.
- Keep this architecture working.
- Do not migrate to Next.js unless explicitly requested.
- Use npm.
- Preserve working source code and improve incrementally.

## Required Reading Order

1. `AGENTS.md`
2. `DESIGN.md`
3. Relevant `.agents/rules/*`
4. Relevant `.agents/workflows/*`
5. `docs/*`

## Product Rules

- B2C-first: payer is family/relative/caregiver.
- End user is an elderly person, not necessarily a patient.
- Primary flow: landing -> pricing -> mock checkout -> onboarding -> dashboard -> bot/care/log management.
- B2B/hospital is future optional channel only.
- Do not restore hospital-first role dashboards unless explicitly requested.
- Do not expose secrets, API keys, payment credentials, or sensitive voice data.

## Healthcare AI Safety

VoiceMed must never:

- Diagnose disease.
- Prescribe medicine.
- Change medication dose.
- Tell someone to start/stop medication.
- Replace doctor, nurse, or caregiver judgment.
- Claim certainty when information is incomplete.

VoiceMed may:

- Ask simple approved check-in questions.
- Remind and collect self-reported information.
- Summarize conversations for family review.
- Alert family when something should be checked.

Safe wording example:

> หากอาการรุนแรง ควรติดต่อบุคลากรทางการแพทย์หรือช่องทางฉุกเฉินที่เหมาะสม

## Versioning

Current version: `v0.2.0`.

Every meaningful update must also update:

- `docs/CHANGELOG.md`
- `docs/PATCH_LOG.md`
- `src/lib/patch-log.ts`
