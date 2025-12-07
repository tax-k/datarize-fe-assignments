import { describe, it, expect } from 'vitest';
import { getDateRange } from './dateRange';

describe('getDateRange', () => {
  const fromDate = new Date('2024-07-15');
  const toDate = new Date('2024-07-20');

  describe('단일 날짜 모드', () => {
    it('시작 날짜만 있으면 같은 날짜로 반환', () => {
      const result = getDateRange({
        fromDate,
        toDate: undefined,
        isSingleDateMode: true,
      });
      expect(result).toEqual({ from: '2024-07-15', to: '2024-07-15' });
    });

    it('종료 날짜만 있으면 같은 날짜로 반환', () => {
      const result = getDateRange({
        fromDate: undefined,
        toDate,
        isSingleDateMode: true,
      });
      expect(result).toEqual({ from: '2024-07-20', to: '2024-07-20' });
    });

    it('둘 다 있으면 시작 날짜 기준으로 반환', () => {
      const result = getDateRange({
        fromDate,
        toDate,
        isSingleDateMode: true,
      });
      expect(result).toEqual({ from: '2024-07-15', to: '2024-07-15' });
    });

    it('둘 다 없으면 undefined 반환', () => {
      const result = getDateRange({
        fromDate: undefined,
        toDate: undefined,
        isSingleDateMode: true,
      });
      expect(result).toEqual({ from: undefined, to: undefined });
    });
  });

  describe('기본 모드', () => {
    it('둘 다 있으면 해당 범위 반환', () => {
      const result = getDateRange({
        fromDate,
        toDate,
        isSingleDateMode: false,
      });
      expect(result).toEqual({ from: '2024-07-15', to: '2024-07-20' });
    });

    it('시작 날짜만 있으면 같은 날짜로 반환 (백엔드 호환)', () => {
      const result = getDateRange({
        fromDate,
        toDate: undefined,
        isSingleDateMode: false,
      });
      expect(result).toEqual({ from: '2024-07-15', to: '2024-07-15' });
    });

    it('종료 날짜만 있으면 같은 날짜로 반환 (백엔드 호환)', () => {
      const result = getDateRange({
        fromDate: undefined,
        toDate,
        isSingleDateMode: false,
      });
      expect(result).toEqual({ from: '2024-07-20', to: '2024-07-20' });
    });

    it('둘 다 없으면 전체 데이터 조회 (undefined 반환)', () => {
      const result = getDateRange({
        fromDate: undefined,
        toDate: undefined,
        isSingleDateMode: false,
      });
      expect(result).toEqual({ from: undefined, to: undefined });
    });
  });
});

