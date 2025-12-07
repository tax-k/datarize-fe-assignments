import type {
  CustomerStats,
  PurchaseFrequency,
  CustomerPurchaseDetail,
} from '@/types/api';
import { API_BASE_URL } from '@/config/constants';

/**
 * 공통 fetch
 */
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * 가격대별 구매 빈도 조회
 * @param from 시작 날짜 (ISO 8601 형식, optional)
 * @param to 종료 날짜 (ISO 8601 형식, optional)
 */
export async function getPurchaseFrequency(
  from?: string,
  to?: string,
): Promise<PurchaseFrequency[]> {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);

  const queryString = params.toString();
  return request<PurchaseFrequency[]>(
    `/api/purchase-frequency${queryString ? `?${queryString}` : ''}`,
  );
}

/**
 * 고객 목록 조회
 * @param sortBy 정렬 기준 (asc/desc, optional)
 * @param name 이름 검색 (optional)
 */
export async function getCustomers(
  sortBy?: 'asc' | 'desc',
  name?: string,
): Promise<CustomerStats[]> {
  const params = new URLSearchParams();
  if (sortBy) params.append('sortBy', sortBy);
  if (name) params.append('name', name);

  const queryString = params.toString();
  return request<CustomerStats[]>(
    `/api/customers${queryString ? `?${queryString}` : ''}`,
  );
}

/**
 * 특정 고객의 구매 내역 조회
 * @param customerId 고객 ID
 */
export async function getCustomerPurchases(
  customerId: number,
): Promise<CustomerPurchaseDetail[]> {
  return request<CustomerPurchaseDetail[]>(
    `/api/customers/${customerId}/purchases`,
  );
}
