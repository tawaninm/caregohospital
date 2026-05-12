# Patch Log

Current version: v0.2.0

## v0.2.0 — 2026-05-12

Type:
Feature / UI / Docs / Safety / Data

Summary:

- Rebranded CareGo Hospital Platform into VoiceMed B2C AI Voice Companion.
- Added subscription landing, pricing, mock checkout, onboarding, family dashboard, elder profiles, bot settings, care templates, call history, alerts, reports, billing, and settings.
- Updated docs and design system for B2C-first direction.

Updated Markdown files:

- README.md
- AGENTS.md
- GEMINI.md
- AI_AGENT_README.md
- DESIGN.md
- .agents/rules/\*
- .agents/workflows/\*
- docs/API_CONTRACTS.md
- docs/DATA_MODEL_OVERVIEW.md
- docs/PROJECT_STRUCTURE.md
- docs/CHANGELOG.md
- docs/PATCH_LOG.md

Updated app files:

- src/lib/voicemed-data.ts
- src/lib/voicemed-store.ts
- src/lib/auth-context.tsx
- src/lib/patch-log.ts
- src/routes/\*
- src/components/AppSidebar.tsx
- src/components/BotnoiChat.tsx
- src/components/CompatibilityBridge.tsx
- src/styles.css

Verification:

- Format: passed with `npm run format`.
- Lint: passed with `npm run lint` and 9 existing fast-refresh warnings.
- Build: passed with `npm run build`.
- Browser smoke check: passed for landing, pricing, checkout, and dashboard at `http://127.0.0.1:5173`.
- Known issues: payment and Botnoi backend integrations are mock/prototype only.

## v0.1.0 — 2026-05-12

Type:
Docs / UI / Feature

Summary:

- Added AI agent documentation and hospital command-center prototype.
- Superseded by v0.2.0.
