// activities.ts - the work that touches the outside world

import { RFIRequest, RFIResult } from './types';

export async function validateRFI(request: RFIRequest): Promise<RFIRequest> {
  console.log(`Validating RFI ${request.rfiId} for project ${request.projectId}`);
  if (!request.description || request.description.trim().length === 0) {
    throw new Error(`RFI ${request.rfiId} is missing a description`);
  }
  return request;
}

export async function assignReviewer(request: RFIRequest): Promise<RFIRequest & { assignedReviewer: string }> {
  console.log(`Assigning reviewer for RFI ${request.rfiId}`);
  const reviewer = `reviewer-${request.projectId}@example.com`;
  return { ...request, assignedReviewer: reviewer };
}

export async function notifyStakeholders(
  request: RFIRequest & { assignedReviewer: string }
): Promise<RFIResult> {
  console.log(`Notifying stakeholders for RFI ${request.rfiId}, reviewer: ${request.assignedReviewer}`);
  return {
    rfiId: request.rfiId,
    status: 'pending',
    assignedReviewer: request.assignedReviewer,
    response: `RFI ${request.rfiId} has been received and assigned to ${request.assignedReviewer}`,
  };
}
