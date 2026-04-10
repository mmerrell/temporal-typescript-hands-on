// workflow.ts - orchestration only, no I/O

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
