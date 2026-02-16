export type DeletionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type DeletionDecision = 'APPROVE' | 'REJECT';

/**
 * View DTO for account deletion requests in admin panel.
 * Maps to backend DeletionRequestViewDto.
 */
export interface DeletionRequestView {
  requestId: string;
  email: string;
  status: DeletionStatus;
  requestedAt: string;
  processedAt?: string | null;
  processedBy?: string | null;
  rejectionReason?: string | null;
}

/**
 * Response DTO for admin processing of account deletion requests.
 * Maps to backend ProcessDeletionResponse.
 * Extends DeletionRequestView with deletion-specific fields.
 */
export interface ProcessDeletionResponse extends DeletionRequestView {
  deletedAt?: string | null;
  message?: string | null;
}

/**
 * Generic account deletion request type.
 * Used as a union type for backward compatibility.
 * @deprecated Use DeletionRequestView or ProcessDeletionResponse instead
 */
export type AccountDeletionRequest =
  | DeletionRequestView
  | ProcessDeletionResponse;

export interface AccountDeletionRequestPage {
  requests: DeletionRequestView[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface AccountDeletionRequestPayload {
  email: string;
}

export interface DeletionRequestResponse {
  requestId: string;
  email: string;
  status: DeletionStatus;
  requestedAt: string;
  message?: string | null;
}
