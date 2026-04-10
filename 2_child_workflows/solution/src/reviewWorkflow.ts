// reviewWorkflow.ts - child workflow handling the review lifecycle

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
