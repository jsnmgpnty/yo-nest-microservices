import { ApiResponseStatus } from "./enums";

export class ApiResponse {
  status: ApiResponseStatus;
  message?: string;
}
