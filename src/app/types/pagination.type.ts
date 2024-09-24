export interface Pagination {
  getAll?: boolean;
  pageSize?: number;
  pageNumber?: number;
}

export interface PaginationResponse<T> {
  list?: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
