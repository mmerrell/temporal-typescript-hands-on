---
slug: converting
id:
type: challenge
title: "Exercise 1: Converting to Temporal"
teaser: Convert a naive async function into a Temporal workflow with activities.
notes:
- type: text
  contents: |-
    In this exercise you'll take plain async TypeScript functions and convert them into a proper Temporal workflow.

    The exercise code calls activities directly — no Temporal involved. Your job is to introduce `proxyActivities`, wire up the workflow, and run it.
tabs:
- title: Terminal 1 - Worker
  type: terminal
  hostname: workshop-host
  workdir: /workspace/exercise
- title: Terminal 2 - Starter
  type: terminal
  hostname: workshop-host
  workdir: /workspace/exercise
- title: VS Code
  type: service
  hostname: workshop-host
  path: ?folder=/workspace/exercise&openFile=/workspace/exercise/src/workflow.ts
  port: 8443
- title: Temporal Web UI
  type: service
  hostname: workshop-host
  path: /
  port: 8080
difficulty: basic
timelimit: 1800
enhanced_loading: null
---

## Exercise 1: Converting to Temporal

The exercise code in `/workspace/exercise/src/workflow.ts` calls activities directly as plain async functions — no Temporal involved. Your job is to convert it into a proper Temporal workflow.

### What you need to implement

Open `workflow.ts` in VS Code. You'll find a naive implementation that calls `validateRFI`, `assignReviewer`, and `notifyStakeholders` directly. Replace it with a Temporal workflow:

**Part A — Import `proxyActivities`**

Add the following import at the top of `workflow.ts`:

```typescript
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
```

**Part B — Create an activity proxy**

Replace the direct activity imports with a proxy:

```typescript
const { validateRFI, assignReviewer, notifyStakeholders } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});
```

**Part C — Export the workflow function**

Make sure your workflow function is exported and uses the proxy (not direct imports):

```typescript
export async function rfiWorkflow(request: RFIRequest): Promise<RFIResult> {
  const validated = await validateRFI(request);
  const assigned = await assignReviewer(validated);
  return await notifyStakeholders(assigned);
}
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

Open the **Temporal Web UI** tab and find `rfi-RFI-1001`. You should see three activity events in the history: `validateRFI`, `assignReviewer`, and `notifyStakeholders` — each with its own `ActivityTaskScheduled` and `ActivityTaskCompleted` events.

Click **Check** when your workflow completes successfully.
