# VoiceMed API Contracts

Current v0.2.0 implementation is frontend mock data only. Future APIs should use `/api` and keep predictable typed responses.

```ts
export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
};
```

## Core Resources

- `FamilyAccount`
- `ElderProfile`
- `SubscriptionPlan`
- `BotConfig`
- `CareTemplate`
- `CallLog`
- `FamilyAlert`
- `DailySummary`
- `BillingRecord`
- `ConsentRecord`

## Future Endpoints

- `POST /api/auth/demo-login`
- `GET /api/family-account`
- `GET /api/subscription-plans`
- `POST /api/checkout/mock-start-trial`
- `GET /api/elder-profiles`
- `POST /api/elder-profiles`
- `GET /api/elder-profiles/:id`
- `GET /api/bot-configs`
- `PATCH /api/bot-configs/:id`
- `GET /api/care-templates`
- `GET /api/call-logs`
- `GET /api/alerts`
- `PATCH /api/alerts/:id/review`
- `PATCH /api/alerts/:id/resolve`
- `GET /api/reports/summary`
- `GET /api/billing`

## Safety Rules

- Validate all inputs.
- Authorize by account/user role.
- Do not return secrets or Botnoi API keys.
- Do not return AI output as medical advice.
- Log AI summaries and alert generation for traceability.
