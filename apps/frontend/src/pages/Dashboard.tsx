import { useState } from 'react';
import { PurchaseFrequencyChart } from '../components/PurchaseFrequencyChart';
import { CustomerList } from '../components/CustomerList';
import { CustomerPurchaseModal } from '../components/CustomerPurchaseModal';

export function Dashboard() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <p className="text-2xl font-bold text-gray-800 mb-2">
          쇼핑몰 구매 데이터 대시보드
        </p>
        <p className="text-lg text-gray-600">7월 한 달 동안의 구매 데이터 분석</p>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col gap-8">
        <section className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
            가격대별 구매 빈도
          </h2>
          <PurchaseFrequencyChart />
        </section>

        <section className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
            고객 구매 현황
          </h2>
          <CustomerList onCustomerClick={setSelectedCustomerId} />
        </section>
      </main>

      {selectedCustomerId !== null && (
        <CustomerPurchaseModal
          customerId={selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}
    </div>
  );
}

