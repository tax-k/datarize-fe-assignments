/**
 * NOTE: 가격대 범위 포맷팅 함수
 * @param range - "0 - 20000" 형식의 문자열
 * @returns "~2만원" 또는 "2만~3만원" 형식의 문자열
 */
export function formatPriceRange(range: string): string {
  const [min, max] = range.split(' - ').map(Number);
  
  // 만원 단위로 변환 (한국에서 더 직관적)
  const minMan = min / 10000;
  const maxMan = max / 10000;
  
  // 첫 번째 범위는 "~2만원" 형식
  if (min === 0) {
    return `~${maxMan.toFixed(0)}만원`;
  }
  
  // 나머지는 "2만~3만원" 형식
  return `${minMan.toFixed(0)}만~${maxMan.toFixed(0)}만원`;
}

/**
 * NOTE: 매출액 포맷팅 함수
 * @param value - 매출액 (원 단위)
 * @returns "1억" 또는 "5000만" 형식의 문자열
 */
export function formatRevenue(value: number): string {
  const eok = value / 100000000; // 억 단위
  const man = value / 10000; // 만원 단위
  
  // 억 단위가 1 이상이면 억 단위로 표시
  if (eok >= 1) {
    // 정수일 때는 소수점 제거, 소수일 때만 소수점 표시
    if (eok >= 10 || Number.isInteger(eok)) {
      return `${Math.floor(eok)}억`;
    }
    return `${eok.toFixed(1)}억`;
  }
  
  // 만원 단위로 표시
  return `${Math.floor(man)}만`;
}

/**
 * NOTE: Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
 * @param date - Date 객체 또는 undefined
 * @returns "YYYY-MM-DD" 형식의 문자열 또는 undefined
 */
export function formatDateForAPI(date: Date | undefined): string | undefined {
  if (!date) return undefined;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

