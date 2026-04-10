---
slug: local-activities
id:
type: challenge
title: "Exercise 4: Local Activities"
teaser: Reduce transaction volume by converting validateRFI to a local activity.
notes:
- type: text
  contents: |-
    In this exercise you'll convert validateRFI from a regular activity to a local activity.

    Local activities run in the same process as the worker — no round-trip to Temporal Server, no separate ActivityTask event in the history. They're ideal for fast, lightweight operations with no external I/O.

    The payoff is visible in the event history: a MarkerRecorded event instead of an ActivityTaskScheduled/Completed pair.
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
difficulty: intermediate
timelimit: 1800
enhanced_loading: null
---

## Exercise 4: Local Activities

`validateRFI` is a good candidate for a local activity: it's fast, purely in-memory, and doesn't need independent retry tracking. Converting it reduces transaction volume — one fewer round-trip to Temporal Server per workflow execution.

Open `workflow.ts` in VS Code.

### What you need to implement

**Part A — Import `proxyLocalActivities`**

```typescript
import { proxyLocalActivities, executeChild } from '@temporalio/workflow';
```

**Part B — Create a local activity proxy for `validateRFI`**

```typescript
const { validateRFI } = proxyLocalActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
```

Remove `validateRFI` from any `proxyActivities` call — it should only appear in the local proxy.

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

Open `rfi-RFI-1004` in the UI and look at the event history. You should see a `MarkerRecorded` event for `validateRFI` instead of an `ActivityTaskScheduled` / `ActivityTaskCompleted` pair. That's the cost optimization in action.

Click **Check** when your workflow completes successfully.
