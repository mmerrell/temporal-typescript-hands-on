---
slug: parallel-activities
id: mjzmv2sb3d9d
type: challenge
title: 'Exercise 3: Parallel Activities'
teaser: Fan out stakeholder notifications to multiple reviewers in parallel using
  Promise.all.
notes:
- type: text
  contents: |-
    In this exercise you'll refactor the review workflow to notify multiple stakeholders simultaneously rather than sequentially.

    The key pattern: Promise.all with Array.map. All three notifications fire at the same time — you'll see this in the event timestamps in the Temporal Web UI.
tabs:
- id: mxikhjapoom9
  title: Terminal 1 - Worker
  type: terminal
  hostname: workshop-host
  workdir: /workspace/exercise
- id: nd7cky1kyvqn
  title: Terminal 2 - Starter
  type: terminal
  hostname: workshop-host
  workdir: /workspace/exercise
- id: dgyr8sbchmrb
  title: VS Code
  type: service
  hostname: workshop-host
  path: ?folder=/workspace/exercise&openFile=/workspace/exercise/src/reviewWorkflow.ts
  port: 8443
- id: hpvl3h15olow
  title: Temporal Web UI
  type: service
  hostname: workshop-host
  path: /
  port: 8080
difficulty: intermediate
timelimit: 1800
enhanced_loading: null
---

## Exercise 3: Parallel Activities

Right now, `reviewWorkflow` notifies only the first reviewer. Your job is to notify all three reviewers in parallel.

Open `reviewWorkflow.ts` in VS Code. The `assignReviewers` activity already returns a list of three reviewers. You need to call `notifyStakeholder` for each of them concurrently.

### What you need to implement

Replace the single `notifyStakeholder` call with a `Promise.all` fan-out:

```typescript
const reviewers = await assignReviewers(request);

const notifications = await Promise.all(
  reviewers.map((reviewer) => notifyStakeholder(request.rfiId, reviewer))
);

return {
  rfiId: request.rfiId,
  status: 'pending',
  reviewers,
  notifications,
};
```

### Run it

In **Terminal 1**, start the worker:

```bash
npm run worker
```

In **Terminal 2**, run the starter:

```bash
npm run starter
```

### Watch it in the Temporal Web UI

Open `review-RFI-1003` in the UI. Look at the event history — the three `notifyStakeholder` activity events should have nearly identical timestamps. That's the visual proof that they ran in parallel, not sequentially.

Click **Check** when all three notifications appear in the result.
