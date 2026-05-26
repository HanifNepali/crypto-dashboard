import axios from "axios";

export class ApiError extends Error {
  status?: number;
  cause?: unknown;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.cause = cause;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    return new ApiError(
      error.response?.data?.message ?? error.message,
      error.response?.status,
      error,
    );
  }

  return new ApiError("An unexpected error occurred", undefined, error);
}
