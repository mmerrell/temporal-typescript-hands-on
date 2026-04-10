// reviewWorkflow.ts - no changes needed in this exercise

import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { RFIRequest, RFIResult } from './types';

const { assignReviewers, notifyStakeholder } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export async function reviewWorkflow(request: RFIRequest): Promise<RFIResult> {
  const reviewers = await assignReviewers(request);

  const notifications = await Promise.all(
    reviewers.map((reviewer) => notifyStakeholder(request.rfiId, reviewer))
  );

  return {
    rfiId: request.rfiId,
    status: 'pending',
    reviewers,
    notifications,
  };
}
