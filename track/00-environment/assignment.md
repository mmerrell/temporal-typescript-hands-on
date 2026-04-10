---
slug: environment
id:
type: challenge
title: "Welcome: Check Your Environment"
teaser: Verify that the Temporal dev server, Node.js, and the workshop repo are ready.
notes:
- type: text
  contents: |-
    Welcome to the Temporal TypeScript Hands-On workshop.

    This track walks through four exercises using a construction RFI (Request for Information) domain. Each exercise builds on the previous one.

    This first challenge just verifies that everything is running before you dive in.
tabs:
- title: Terminal
  type: terminal
  hostname: workshop-host
  workdir: /workspace/workshop
- title: Temporal Web UI
  type: service
  hostname: workshop-host
  path: /
  port: 8080
difficulty: basic
timelimit: 600
enhanced_loading: null
---

## Welcome to the Temporal TypeScript Workshop

Let's make sure everything is ready before starting the exercises.

### Check Node.js

```bash
node --version
```

You should see `v22.x.x` or higher.

### Check the Temporal server

```bash
temporal operator cluster health --address 127.0.0.1:7233
```

You should see `SERVING`.

### Check the workshop repo

```bash
ls /workspace/workshop
```

You should see four exercise directories: `1_converting`, `2_child_workflows`, `3_parallel_activities`, `4_local_activities`.

### Open the Temporal Web UI

Click the **Temporal Web UI** tab above. You should see the Temporal UI with no workflows yet — that's expected.

Click **Check** when everything looks good.
