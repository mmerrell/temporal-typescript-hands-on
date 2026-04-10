// types.ts - shared domain types for the RFI workflow

export interface RFIRequest {
  rfiId: string;
  projectId: string;
  submittedBy: string;
  description: string;
}

export interface RFIResult {
  rfiId: string;
  status: 'approved' | 'rejected' | 'pending';
  assignedReviewer: string;
  response: string;
}
