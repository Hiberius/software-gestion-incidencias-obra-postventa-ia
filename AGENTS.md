# AGENTS.md

## Product invariants

- All visible UI copy is professional Spanish.
- All bundled operational data is synthetic and labelled as such.
- AI output is an editable suggestion, never a certified diagnosis.
- No incident can close without technical approval and customer conformity.
- Similar incidents are never merged automatically.
- Illustrative ROI assumptions must remain distinct from achieved results.

## Technical constraints

- Node 22, npm, Next.js App Router and static export.
- Keep all routes compatible with Cloudflare Pages static hosting.
- Do not add Server Actions, request-time route handlers, cookies, ISR or runtime secrets without migrating to OpenNext Workers.
- Write tests before changing business logic; maintain 80 %+ coverage and the Playwright guided-flow test.

## Required checks

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=moderate
```
