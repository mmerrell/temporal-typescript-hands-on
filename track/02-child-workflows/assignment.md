---
slug: child-workflows
id:
type: challenge
title: "Exercise 2: Child Workflows"
teaser: Decompose rfiWorkflow into a parent and child workflow.
notes:
- type: text
  contents: |-
    In this exercise you'll refactor the RFI workflow to delegate the review lifecycle to a child workflow.

    The parent workflow handles validation. A new child workflow handles reviewer assignment and stakeholder notification. Each has its own independent event history in the Temporal UI.
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

## Exercise 2: Child Workflows

The RFI workflow currently does everything itself. Your job is to extract the review lifecycle into a child workflow.

The child workflow (`reviewWorkflow.ts`) is already written and provided — read it before editing `workflow.ts`.

### What you need to implement

Open `workflow.ts` in VS Code. You need to:

**Part A — Import `executeChild` and the child workflow**

```typescript
import { proxyActivities, executeChild } from '@temporalio/workflow';
import { reviewWorkflow } from './reviewWorkflow';
```

**Part B — Remove `assignReviewer` and `notifyStakeholders` from `proxyActivities`**

Those activities now live in the child workflow. The parent only needs `validateRFI`:

```typescript
const { validateRFI } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});
```

**Part C — Call the child workflow with `executeChild`**

```typescript
export async function rfiWorkflow(request: RFIRequest): Promise<RFIResult> {
  const validated = await validateRFI(request);
  return await executeChild(reviewWorkflow, {
    workflowId: `review-${request.rfiId}`,
    args: [validated],
  });
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

You should now see two workflows: `rfi-RFI-1002` (parent) and `review-RFI-1002` (child). Click into each to see their independent event histories.

Click **Check** when both workflows complete successfully.
