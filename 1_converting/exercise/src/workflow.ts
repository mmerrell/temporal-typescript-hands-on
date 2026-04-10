// workflow.ts
//
// TODO: Convert this naive implementation into a Temporal workflow.
//
// Right now, processRFI is just a plain async function that calls activities
// directly. Your job is to:
//
//   1. Import proxyActivities from '@temporalio/workflow'
//   2. Import the activities type with `import type`
//   3. Create an activity proxy using proxyActivities with a startToCloseTimeout
//   4. Export an async function named `rfiWorkflow` that uses the proxy
//      to call validateRFI, assignReviewer, and notifyStakeholders in sequence
//
// The starter and worker are already wired up — once your workflow compiles,
// run the worker and starter to see it execute.

import { RFIRequest, RFIResult } from './types';
import { validateRFI, assignReviewer, notifyStakeholders } from './activities';

// This is the naive version. Replace it with a Temporal workflow.
export async function rfiWorkflow(request: RFIRequest): Promise<RFIResult> {
  const validated = await validateRFI(request);
  const assigned = await assignReviewer(validated);
  return await notifyStakeholders(assigned);
}
