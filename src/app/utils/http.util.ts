import { HttpResponseList } from "../types/http/response.type";
import { PaginationResponse } from "../types/pagination.type";

// Hàm này sẽ thay đổi giá trị của pageInfo thành giá trị của res
// Mà không gán tham chiếu mới cho pageInfo
// Điều này giúp sort và filter hoạt động đúng trên TableDataComponent
export function mapPageInfoResponse<T>(pageInfo: PaginationResponse<T>, res: HttpResponseList<T>): boolean {
  if (!pageInfo || !res?.data) {
    return false;
  }

  pageInfo.pageNumber = res.data.pageNumber;
  pageInfo.pageSize = res.data.pageSize;
  pageInfo.totalItems = res.data.totalItems;
  pageInfo.totalPages = res.data.totalPages;

  return true
}

// Hàm này sẽ thay đổi giá trị của originalList thành giá trị của newList
// Mà không gán tham chiếu mới cho originalList
// Điều này giúp sort và filter hoạt động đúng trên TableDataComponent
export function mapResultListResponse<T>(originalList: T[], res: HttpResponseList<T>): boolean {
  if (!originalList || !res?.data) {
    return false;
  }

  originalList.length = 0;
  originalList.push(...res.data.list || []);

  return true;
}
