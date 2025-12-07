import { describe, it, expect } from 'vitest';
import { formatPriceRange, formatRevenue, formatDateForAPI } from './format';

describe('formatPriceRange', () => {
  it('첫 번째 범위(0부터 시작)는 ~만원 형식으로 포맷팅', () => {
    expect(formatPriceRange('0 - 20000')).toBe('~2만원');
    expect(formatPriceRange('0 - 10000')).toBe('~1만원');
    expect(formatPriceRange('0 - 50000')).toBe('~5만원');
  });

  it('나머지 범위는 만~만원 형식으로 포맷팅', () => {
    expect(formatPriceRange('20001 - 30000')).toBe('2만~3만원');
    expect(formatPriceRange('40001 - 50000')).toBe('4만~5만원');
    expect(formatPriceRange('90001 - 100000')).toBe('9만~10만원');
  });

  it('큰 범위도 올바르게 포맷팅', () => {
    expect(formatPriceRange('100001 - 200000')).toBe('10만~20만원');
  });
});

describe('formatRevenue', () => {
  it('1억 이상이면 억 단위로 표시', () => {
    expect(formatRevenue(100000000)).toBe('1억');
    expect(formatRevenue(150000000)).toBe('1.5억');
    expect(formatRevenue(200000000)).toBe('2억');
    expect(formatRevenue(1000000000)).toBe('10억');
  });

  it('10억 이상이면 소수점 없이 표시', () => {
    expect(formatRevenue(1000000000)).toBe('10억');
    expect(formatRevenue(15000000000)).toBe('150억');
  });

  it('1억 미만이면 만원 단위로 표시', () => {
    expect(formatRevenue(10000)).toBe('1만');
    expect(formatRevenue(50000)).toBe('5만');
    expect(formatRevenue(100000)).toBe('10만');
    expect(formatRevenue(50000000)).toBe('5000만');
    expect(formatRevenue(99990000)).toBe('9999만');
  });

  it('0원 처리', () => {
    expect(formatRevenue(0)).toBe('0만');
  });
});

describe('formatDateForAPI', () => {
  it('Date 객체를 YYYY-MM-DD 형식으로 변환', () => {
    const date = new Date('2024-07-15');
    expect(formatDateForAPI(date)).toBe('2024-07-15');
  });

  it('월과 일이 한 자리수일 때 앞에 0을 붙임', () => {
    const date = new Date('2024-01-05');
    expect(formatDateForAPI(date)).toBe('2024-01-05');
  });

  it('undefined를 전달하면 undefined 반환', () => {
    expect(formatDateForAPI(undefined)).toBeUndefined();
  });

  it('다양한 날짜 형식 처리', () => {
    const date1 = new Date('2024-12-31');
    expect(formatDateForAPI(date1)).toBe('2024-12-31');

    const date2 = new Date('2023-03-01');
    expect(formatDateForAPI(date2)).toBe('2023-03-01');
  });
});

