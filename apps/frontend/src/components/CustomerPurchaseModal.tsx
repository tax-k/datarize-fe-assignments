import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useCustomerPurchases } from '@/hooks/useCustomerPurchases';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CustomerPurchaseModalProps {
  customerId: number;
  onClose: () => void;
}

export function CustomerPurchaseModal({
  customerId,
  onClose,
}: CustomerPurchaseModalProps) {
  const { data, isLoading, error } = useCustomerPurchases(customerId);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy년 MM월 dd일', { locale: ko });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>고객 구매 내역</DialogTitle>
          <DialogDescription>고객 ID: {customerId}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">데이터를 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <p className="text-destructive">데이터를 불러오는 중 오류가 발생했습니다.</p>
            </div>
          )}

          {!isLoading && !error && data && data.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">구매 내역이 없습니다.</p>
            </div>
          )}

          {!isLoading && !error && data && data.length > 0 && (
            <div className="space-y-4">
              {data.map((purchase, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="shrink-0">
                    <img
                      src={purchase.imgSrc}
                      alt={purchase.product}
                      className="w-20 h-20 object-cover rounded-md border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{purchase.product}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatDate(purchase.date)}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            수량: <span className="font-medium">{purchase.quantity}개</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(purchase.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
