// workflow.ts - parent workflow, delegates review lifecycle to a child workflow
// No changes needed in this exercise — the parallel work happens in reviewWorkflow.ts

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
