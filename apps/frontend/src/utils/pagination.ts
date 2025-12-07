/**
 * 페이지네이션 계산 유틸리티
 */
export interface PaginationResult {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginatedData: <T>(data: T[]) => T[];
}

/**
 * @param totalItems - 전체 항목 수
 * @param currentPage - 현재 페이지 (1부터 시작)
 * @param itemsPerPage - 페이지당 항목 수
 * @returns 페이지네이션 결과
 */
export function calculatePagination(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number = 10
): PaginationResult {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    totalPages,
    startIndex,
    endIndex,
    paginatedData: <T>(data: T[]) => data.slice(startIndex, endIndex),
  };
}

