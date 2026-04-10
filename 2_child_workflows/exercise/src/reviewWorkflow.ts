// reviewWorkflow.ts - this file is complete, no changes needed
//
// This is the child workflow you'll be calling from rfiWorkflow.
// Read through it to understand its shape before editing workflow.ts.

import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { RFIRequest, RFIResult } from './types';

const { assignReviewer, notifyStakeholders } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export async function reviewWorkflow(request: RFIRequest): Promise<RFIResult> {
  const assigned = await assignReviewer(request);
  return await notifyStakeholders(assigned);
}
