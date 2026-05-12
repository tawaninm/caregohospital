# AI Agent README

This repository contains the VoiceMed B2C AI Voice Companion prototype.

## How To Use This Agent Pack

- Start with `AGENTS.md`.
- Use `DESIGN.md` as the UI source of truth.
- Use `.agents/rules/*` for canonical implementation rules.
- Use `.agents/workflows/*` for task-specific execution.
- Use `docs/*` for developer-facing contracts and data model notes.

## Product Summary

VoiceMed helps family members subscribe to an AI Voice Companion that calls elderly relatives, asks simple questions, reminds gently, listens, summarizes, and alerts family when something should be reviewed.

## Current Structure

The current repo is still a single Vite/TanStack/React app. Do not force a full migration. Future architecture may split into apps/packages later, but v0.2.0 keeps the prototype working.

## Recommended First Tasks

1. Verify landing -> pricing -> checkout -> onboarding.
2. Verify family dashboard and elder profile flows.
3. Verify Bot Settings, Care Plans, Call History, Alerts, Reports, Billing.
4. Run lint/build.
5. Update changelog and patch log.
