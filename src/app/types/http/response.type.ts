import { PaginationResponse } from "../pagination.type";

export interface HttpResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface HttpResponseList<T> {
  code: number;
  message: string;
  data: PaginationResponse<T>;
}
