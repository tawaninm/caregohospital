# VoiceMed B2C AI Voice Companion

VoiceMed is a B2C subscription prototype for family members who care for elderly parents, grandparents, or relatives. It helps families set up a Voice bot / Chatbot flow, schedule simple check-in calls, review call logs, receive alerts, and manage subscription status from one caregiver-friendly platform.

## Product Direction

- Primary customer: family members, relatives, and caregivers.
- End user: elderly people who may or may not be patients.
- Core promise: "ทำงานอย่างหมดห่วง เพราะ VoiceMed อยู่เคียงข้างคุณตาคุณยาย".
- MVP focus: landing page, pricing, mock checkout, onboarding, family dashboard, elder profiles, bot settings, care templates, call history, alerts, reports, billing, and settings.
- Future channel: B2B/hospital partnerships may exist later, but this app is now B2C-first.

## Current Stack

- Vite + TanStack Router + React + TypeScript
- Tailwind CSS v4
- Radix/shadcn-style UI primitives
- Lucide React
- Recharts
- Sonner
- Mock data/store in frontend TypeScript

Use npm because `package-lock.json` is present.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Safety

VoiceMed is an AI companion and monitoring layer. It must never diagnose, prescribe, change medication, or replace professional care. Serious symptoms should be phrased as a reason for family review and, when needed, a reason to contact medical professionals or the proper emergency channel.
