// workflow.ts
//
// TODO: Refactor rfiWorkflow to delegate the review lifecycle to a child workflow.
//
// Right now, rfiWorkflow calls all three activities itself. Your job is to:
//
//   1. Import `executeChild` from '@temporalio/workflow'
//   2. Import `reviewWorkflow` from './reviewWorkflow'
//   3. Remove `assignReviewer` and `notifyStakeholders` from proxyActivities
//      (they now live in the child workflow)
//   4. Replace the assignReviewer + notifyStakeholders calls with a single
//      executeChild(reviewWorkflow, { workflowId: `review-${request.rfiId}`, args: [validated] })
//
// When it works, you should see two workflows in the Temporal UI:
// rfi-RFI-1002 (parent) and review-RFI-1002 (child).

import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { RFIRequest, RFIResult } from './types';

const { validateRFI, assignReviewer, notifyStakeholders } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export async function rfiWorkflow(request: RFIRequest): Promise<RFIResult> {
  const validated = await validateRFI(request);
  const assigned = await assignReviewer(validated);
  return await notifyStakeholders(assigned);
}
