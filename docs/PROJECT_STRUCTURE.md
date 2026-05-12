# Project Structure

Current repository structure remains a single Vite/TanStack/React app.

```txt
src/
  components/
    AppSidebar.tsx
    BotnoiChat.tsx
    CompatibilityBridge.tsx
  lib/
    auth-context.tsx
    patch-log.ts
    voicemed-data.ts
    voicemed-store.ts
  routes/
    index.tsx
    pricing.tsx
    checkout.tsx
    onboarding.tsx
    dashboard.tsx
    elder-profiles.tsx
    elder-profiles.$elderId.tsx
    bot-settings.tsx
    care-plans.tsx
    call-history.tsx
    alerts.tsx
    reports.tsx
    billing.tsx
    settings.tsx
    patch-log.tsx
```

Compatibility routes exist for old CareGo paths and should guide users to VoiceMed pages.

Future backend/monorepo work may introduce `apps/api`, `packages/shared`, and Prisma, but do not migrate architecture in the current prototype unless requested.
