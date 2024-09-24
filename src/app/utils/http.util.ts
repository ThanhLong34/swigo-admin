import { HttpResponseList } from "../types/http/response.type";
import { PaginationResponse } from "../types/pagination.type";

export function mapHttpPaginationResponse<T>(res: HttpResponseList<T>): PaginationResponse<T> {
  return {
    pageNumber: res.data.pageNumber,
    pageSize: res.data.pageSize,
    totalItems: res.data.totalItems,
    totalPages: res.data.totalPages
  };
}
