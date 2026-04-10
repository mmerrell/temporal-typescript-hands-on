// reviewWorkflow.ts
//
// TODO: Refactor the review lifecycle to notify all reviewers in parallel.
//
// Right now, this workflow calls notifyStakeholder once for a single reviewer.
// Your job is to:
//
//   1. Call assignReviewers (already imported) to get a list of reviewers
//   2. Use Promise.all with Array.map to call notifyStakeholder for each
//      reviewer concurrently
//   3. Return an RFIResult with the full reviewers array and notifications array
//
// When it works, you should see three notifyStakeholder activity events firing
// at nearly the same timestamp in the Temporal UI.

import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { RFIRequest, RFIResult } from './types';

const { assignReviewers, notifyStakeholder } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export async function reviewWorkflow(request: RFIRequest): Promise<RFIResult> {
  // TODO: replace this with parallel notifications across all reviewers
  const reviewers = await assignReviewers(request);
  const notification = await notifyStakeholder(request.rfiId, reviewers[0]);

  return {
    rfiId: request.rfiId,
    status: 'pending',
    reviewers,
    notifications: [notification],
  };
}
