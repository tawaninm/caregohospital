# Workflow: Future Prisma Database

Purpose: prepare PostgreSQL persistence when backend work begins.

Models:

- FamilyAccount
- ElderProfile
- Subscription
- BotConfig
- CareTemplate
- CallLog
- FamilyAlert
- ConsentRecord
- AuditLog

Acceptance:

- Schema validates.
- Seed data mirrors Thai VoiceMed demo data.
- Sensitive voice/consent data is handled carefully.
