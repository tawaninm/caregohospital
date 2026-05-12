# GEMINI.md

Gemini and other AI coding agents must read `AGENTS.md` first.

## VoiceMed Guidance

- Treat this repo as VoiceMed B2C, not CareGo Hospital.
- Follow `.agents/rules/*` and `DESIGN.md`.
- Keep the existing Vite/TanStack/React architecture.
- Improve incrementally; do not rebuild from scratch.
- Preserve routes and source code where possible, but visible UX should be VoiceMed B2C.

## Safety

Avoid unsafe healthcare claims. VoiceMed can listen, remind, summarize, and notify family. It must not diagnose, prescribe, adjust medication, or replace human care.
