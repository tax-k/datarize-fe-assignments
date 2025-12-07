import { useQuery } from '@tanstack/react-query';
import { getCustomerPurchases } from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import type { CustomerPurchaseDetail } from '@/types/api';

/**
 * 특정 고객의 구매 내역 조회 hook
 */
export function useCustomerPurchases(customerId: number | null) {
  return useQuery<CustomerPurchaseDetail[]>({
    queryKey: customerId
      ? queryKeys.customerPurchases.byId(customerId)
      : [...queryKeys.customerPurchases.all, null],
    queryFn: () => {
      if (!customerId) {
        throw new Error('Customer ID is required');
      }
      return getCustomerPurchases(customerId);
    },
    enabled: customerId !== null, // customerId가 null이 아닐 때만 실행
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
