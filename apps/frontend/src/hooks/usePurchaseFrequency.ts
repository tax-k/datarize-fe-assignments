import { useQuery } from '@tanstack/react-query';
import { getPurchaseFrequency } from '../api/client';
import { queryKeys } from '../api/queryKeys';
import type { PurchaseFrequency } from '../types/api';

interface UsePurchaseFrequencyParams {
  from?: string;
  to?: string;
}

/**
 * 가격대별 구매 빈도 조회 훅
 */
export function usePurchaseFrequency({ from, to }: UsePurchaseFrequencyParams = {}) {
  return useQuery<PurchaseFrequency[]>({
    queryKey: queryKeys.purchaseFrequency.byDateRange(from, to),
    queryFn: () => getPurchaseFrequency(from, to),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
