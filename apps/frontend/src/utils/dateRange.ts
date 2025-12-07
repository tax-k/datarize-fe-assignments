import { formatDateForAPI } from './format';

interface DateRangeParams {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  isSingleDateMode: boolean;
}

interface DateRangeResult {
  from: string | undefined;
  to: string | undefined;
}

/**
 * 
 * @param params - 날짜 필터링 파라미터
 * @returns API에 전달할 날짜 범위
 */
export function getDateRange({
  fromDate,
  toDate,
  isSingleDateMode,
}: DateRangeParams): DateRangeResult {
  // NOTE: 단일 날짜 모드 (체크박스 활성): 00:00:00 ~ 23:59:59
  if (isSingleDateMode) {
    // NOTE: 시작 날짜가 있으면 시작 날짜 기준, 없으면 종료 날짜 기준
    if (fromDate) {
      const dateStr = formatDateForAPI(fromDate);
      return { from: dateStr, to: dateStr };
    }
    if (toDate) {
      const dateStr = formatDateForAPI(toDate);
      return { from: dateStr, to: dateStr };
    }
    return { from: undefined, to: undefined };
  }

  // NOTE: 기본 모드 (체크박스 비활성): 시작 ~ 종료 사이
  if (fromDate && toDate) {
    return {
      from: formatDateForAPI(fromDate),
      to: formatDateForAPI(toDate),
    };
  }

  // NOTE: 시작 날짜만 있으면 같은 날짜로 보냄 (백엔드가 하나만 받으면 400이므로)
  if (fromDate && !toDate) {
    const dateStr = formatDateForAPI(fromDate);
    return { from: dateStr, to: dateStr };
  }

  // NOTE: 종료 날짜만 있으면 같은 날짜로 보냄 (백엔드가 하나만 받으면 400이므로)
  if (!fromDate && toDate) {
    const dateStr = formatDateForAPI(toDate);
    return { from: dateStr, to: dateStr };
  }

  // NOTE: 둘 다 없으면 전체 데이터
  return { from: undefined, to: undefined };
}

