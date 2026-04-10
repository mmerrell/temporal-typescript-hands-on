// workflow.ts - parent workflow, uses a local activity for fast in-process validation

import { proxyLocalActivities, executeChild } from '@temporalio/workflow';
import type * as activities from './activities';
import { reviewWorkflow } from './reviewWorkflow';
import { RFIRequest, RFIResult } from './types';

// Local activity: fast, no external I/O, runs in the same process as the worker.
// Does not generate a separate Activity Task in the event history.
const { validateRFI } = proxyLocalActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export async function rfiWorkflow(request: RFIRequest): Promise<RFIResult> {
  const validated = await validateRFI(request);

  return await executeChild(reviewWorkflow, {
    workflowId: `review-${request.rfiId}`,
    args: [validated],
  });
}
