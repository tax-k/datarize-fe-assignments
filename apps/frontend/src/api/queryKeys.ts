/**
 * TanStack Query 쿼리키 팩토리
 */
export const queryKeys = {
  purchaseFrequency: {
    all: ['purchase-frequency'] as const,
    byDateRange: (from?: string, to?: string) =>
      ['purchase-frequency', from, to] as const,
  },
  customers: {
    all: ['customers'] as const,
    byParams: (sortBy?: 'asc' | 'desc', name?: string) =>
      ['customers', sortBy, name] as const,
  },
  customerPurchases: {
    all: ['customer-purchases'] as const,
    byId: (customerId: number) => ['customer-purchases', customerId] as const,
  },
} as const;

