# VoiceMed Data Model Overview

VoiceMed v0.2.0 separates family subscription, elderly profile, bot setup, conversation logs, alerts, and billing.

## Key Concepts

- `FamilyAccount`: payer and subscription owner.
- `ElderProfile`: elderly person being supported.
- `SubscriptionPlan`: monthly package.
- `BotConfig`: Voice bot / Chatbot configuration per elder.
- `CareTemplate`: reusable question set.
- `CallLog`: actual voice/chat result.
- `FamilyAlert`: item family should review.
- `DailySummary`: family-readable summary.
- `BillingRecord`: mock subscription history.
- `ConsentRecord`: PDPA/voice/report consent.

## Important Boundary

Do not treat every AI call as a clinical case. In VoiceMed B2C, the main work item is a family-facing alert or care task, not a hospital case.

## Safety

Disease-specific details should remain notes or structured observations, not final medical conclusions. VoiceMed can collect, summarize, and alert; it must not diagnose or prescribe.
