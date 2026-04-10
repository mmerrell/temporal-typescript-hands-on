// activities.ts - the work that touches the outside world

import { RFIRequest } from './types';

export async function validateRFI(request: RFIRequest): Promise<RFIRequest> {
  console.log(`Validating RFI ${request.rfiId} for project ${request.projectId}`);
  if (!request.description || request.description.trim().length === 0) {
    throw new Error(`RFI ${request.rfiId} is missing a description`);
  }
  return request;
}

export async function assignReviewers(request: RFIRequest): Promise<string[]> {
  console.log(`Assigning reviewers for RFI ${request.rfiId}`);
  // Simulate multi-party review assignment: structural engineer, architect, PM
  return [
    `structural-engineer@${request.projectId}.example.com`,
    `architect@${request.projectId}.example.com`,
    `project-manager@${request.projectId}.example.com`,
  ];
}

export async function notifyStakeholder(rfiId: string, reviewer: string): Promise<string> {
  console.log(`Notifying ${reviewer} about RFI ${rfiId}`);
  // Simulate sending a notification (email, Slack, etc.)
  return `Notified ${reviewer} about RFI ${rfiId}`;
}
