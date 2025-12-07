import { describe, it, expect } from 'vitest';
import { calculatePagination } from './pagination';

describe('calculatePagination', () => {
  it('기본 페이지당 10개 항목으로 계산', () => {
    const result = calculatePagination(25, 1);
    expect(result.totalPages).toBe(3);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(10);
  });

  it('첫 페이지 데이터 슬라이싱', () => {
    const result = calculatePagination(25, 1);
    const data = Array.from({ length: 25 }, (_, i) => i + 1);
    const paginated = result.paginatedData(data);
    expect(paginated).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('두 번째 페이지 데이터 슬라이싱', () => {
    const result = calculatePagination(25, 2);
    const data = Array.from({ length: 25 }, (_, i) => i + 1);
    const paginated = result.paginatedData(data);
    expect(paginated).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('마지막 페이지 데이터 슬라이싱', () => {
    const result = calculatePagination(25, 3);
    const data = Array.from({ length: 25 }, (_, i) => i + 1);
    const paginated = result.paginatedData(data);
    expect(paginated).toEqual([21, 22, 23, 24, 25]);
  });

  it('커스텀 페이지당 항목 수로 계산', () => {
    const result = calculatePagination(25, 1, 5);
    expect(result.totalPages).toBe(5);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(5);
  });

  it('정확히 나누어떨어지는 경우', () => {
    const result = calculatePagination(20, 2);
    expect(result.totalPages).toBe(2);
    expect(result.startIndex).toBe(10);
    expect(result.endIndex).toBe(20);
  });

  it('항목 수가 페이지당 항목 수보다 적은 경우', () => {
    const result = calculatePagination(5, 1);
    expect(result.totalPages).toBe(1);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(10);
    
    const data = [1, 2, 3, 4, 5];
    const paginated = result.paginatedData(data);
    expect(paginated).toEqual([1, 2, 3, 4, 5]);
  });

  it('빈 배열 처리', () => {
    const result = calculatePagination(0, 1);
    expect(result.totalPages).toBe(0);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(10);
    
    const paginated = result.paginatedData([]);
    expect(paginated).toEqual([]);
  });
});

