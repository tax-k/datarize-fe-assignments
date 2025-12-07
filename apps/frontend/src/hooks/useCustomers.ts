import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import type { CustomerStats } from '@/types/api';

interface UseCustomersParams {
  sortBy?: 'asc' | 'desc';
  name?: string;
}

/**
 * 고객 목록 조회 hook
 */
export function useCustomers({ sortBy, name }: UseCustomersParams = {}) {
  return useQuery<CustomerStats[]>({
    queryKey: queryKeys.customers.byParams(sortBy, name),
    queryFn: () => getCustomers(sortBy, name),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
