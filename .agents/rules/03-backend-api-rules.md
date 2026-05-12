# 03 Backend API Rules

Backend is future work. When added:

- REST endpoints under `/api`.
- Use `ApiResponse<T>`.
- Validate inputs with Zod.
- Authorize by family account and role.
- Never expose secrets, Botnoi API keys, payment keys, or sensitive voice data.
- Keep AI summaries traceable and auditable.
