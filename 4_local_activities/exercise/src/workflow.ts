// workflow.ts
//
// TODO: Convert validateRFI from a regular activity to a local activity.
//
// validateRFI is a good candidate for a local activity because:
//   - It does no external I/O
//   - It is fast and lightweight
//   - It does not need independent retry tracking in the event history
//
// Your job is to:
//   1. Import `proxyLocalActivities` alongside `proxyActivities` (or instead of it)
//      from '@temporalio/workflow'
//   2. Create a local activity proxy for validateRFI with a short startToCloseTimeout
//   3. Remove validateRFI from the regular proxyActivities call
//
// When it works, open the rfi-RFI-1004 workflow in the Temporal UI. You should
// see a MarkerRecorded event for validateRFI instead of a separate ActivityTask —
// that is the cost optimization in action.

import { proxyActivities, executeChild } from '@temporalio/workflow';
import type * as activities from './activities';
import { reviewWorkflow } from './reviewWorkflow';
import { RFIRequest, RFIResult } from './types';

const { validateRFI } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export async function rfiWorkflow(request: RFIRequest): Promise<RFIResult> {
  const validated = await validateRFI(request);

  return await executeChild(reviewWorkflow, {
    workflowId: `review-${request.rfiId}`,
    args: [validated],
  });
}
