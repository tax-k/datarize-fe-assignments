import { useState } from 'react';
import { CustomerList } from '@/components/CustomerList';
import { CustomerPurchaseModal } from '@/components/CustomerPurchaseModal';

export function CustomersPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
      <h2 className="text-xl font-bold">고객 구매 현황</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          고객별 구매 통계를 확인하고 상세 내역을 조회할 수 있습니다.
        </p>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <CustomerList onCustomerClick={setSelectedCustomerId} />
      </div>

      {selectedCustomerId !== null && (
        <CustomerPurchaseModal
          customerId={selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}
    </div>
  );
}


