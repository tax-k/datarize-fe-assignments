import { PurchaseFrequencyChart } from '@/components/PurchaseFrequencyChart';

export function PurchaseFrequencyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">가격대별 구매 빈도</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          각 가격대의 제품이 얼마나 많이 구매되었는지 확인할 수 있습니다.
        </p>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <PurchaseFrequencyChart />
      </div>
    </div>
  );
}

