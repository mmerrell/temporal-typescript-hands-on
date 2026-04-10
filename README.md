# Temporal TypeScript Hands-On

Four exercises for learning the Temporal TypeScript SDK. Each exercise builds on the previous one.

## Prerequisites

- Node.js 18+
- [Temporal CLI](https://docs.temporal.io/cli)

## Exercises

| # | Topic | Concept |
|---|-------|---------|
| 1 | Converting to Temporal | Workflows, Activities, Workers |
| 2 | Child Workflows | Decomposing workflows into sub-workflows |
| 3 | Parallel Activities | Fan-out with `Promise.all` |
| 4 | Local Activities | Cost optimization for lightweight tasks |

## Running an Exercise

Each exercise has an `exercise/` and a `solution/` directory. Start in `exercise/`.

**1. Start the Temporal dev server** (one-time, leave running):
```bash
temporal server start-dev
```

**2. Install dependencies:**
```bash
cd <exercise_dir>
npm install
```

**3. Start the worker** (Terminal 2):
```bash
npm run worker
```

**4. Run the starter** (Terminal 3):
```bash
npm run starter
```

**5. Open the Temporal UI:**

Navigate to [http://localhost:8233](http://localhost:8233) to inspect workflow executions.

## Domain

All exercises use an RFI (Request for Information) domain — a common construction project management workflow involving validation, reviewer assignment, and stakeholder notification.
