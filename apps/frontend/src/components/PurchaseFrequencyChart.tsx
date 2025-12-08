import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { formatPriceRange, formatRevenue } from '@/utils/format';
import { getDateRange } from '@/utils/dateRange';

export function PurchaseFrequencyChart() {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false); 
  const [isSingleDateMode, setIsSingleDateMode] = useState(false); // NOTE: 단일 날짜 모드 (00:00:00 ~ 23:59:59)

  const { from: actualFromDate, to: actualToDate } = getDateRange({
    fromDate,
    toDate,
    isSingleDateMode,
  });

  const { data, isLoading, error, refetch } = usePurchaseFrequency({
    from: actualFromDate,
    to: actualToDate,
  });

  const handleApplyFilter = () => {
    refetch();
  };

  const handleResetFilter = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setIsSingleDateMode(false);
  };

  const chartConfig = {
    count: {
      label: '구매 수량',
      color: '#000',
    },
    revenue: {
      label: '매출액',
      color: 'hsl(0, 0%, 50%)',
    },
  } satisfies ChartConfig;

  const chartData = data?.map((item) => ({
    range: item.range,
    rangeFormatted: formatPriceRange(item.range),
    count: item.count,
    revenue: item.revenue,
  })) || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4 pb-4 border-b">
        <div className="flex flex-wrap gap-4">
          <div className={cn('flex-1 min-w-[200px]', isSingleDateMode && 'max-w-[300px]')}>
            <Label htmlFor="from-date" className="px-1">
              {isSingleDateMode ? '날짜' : '시작 날짜'}
            </Label>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="from-date"
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal mt-1',
                    !fromDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? (
                    fromDate.toLocaleDateString('ko-KR')
                  ) : (
                    <span>날짜 선택</span>
                  )}
                  <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start" side="bottom">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={(date) => {
                    setFromDate(date);
                    setFromOpen(false);
                  }}
                  captionLayout="dropdown"
                  disabled={(date) => {
                    if (toDate && !isSingleDateMode) {
                      return date > toDate;
                    }
                    return false;
                  }}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground mt-1 px-1">
              {isSingleDateMode
                ? '선택한 날짜의 00:00:00 ~ 23:59:59 범위로 조회됩니다'
                : '종료 날짜를 입력하지 않으면 시작 날짜부터 데이터 끝까지 조회됩니다'}
            </p>
          </div>
          {!isSingleDateMode && (
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="to-date" className="px-1">
                종료 날짜 (선택사항)
              </Label>
              <Popover open={toOpen} onOpenChange={setToOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="to-date"
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal mt-1',
                      !toDate && 'text-muted-foreground',
                    )}
                    disabled={!fromDate}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? (
                      toDate.toLocaleDateString('ko-KR')
                    ) : (
                      <span>날짜 선택</span>
                    )}
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start" side="bottom">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => {
                      setToDate(date);
                      setToOpen(false);
                    }}
                    captionLayout="dropdown"
                    disabled={(date) => {
                      if (fromDate) {
                        return date < fromDate;
                      }
                      return false;
                    }}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1 px-1">
                비워두면 시작 날짜부터 데이터 끝까지 조회됩니다
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="single-date-mode"
              checked={isSingleDateMode}
              onCheckedChange={(checked) => {
                setIsSingleDateMode(checked === true);
                // 단일 날짜 모드로 전환할 때 종료 날짜 초기화
                if (checked === true) {
                  setToDate(undefined);
                }
              }}
            />
            <Label
              htmlFor="single-date-mode"
              className="text-sm font-normal cursor-pointer"
            >
              단일 날짜 모드 (00:00:00 ~ 23:59:59)
            </Label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleApplyFilter} disabled={isLoading}>
              적용
            </Button>
            <Button variant="outline" onClick={handleResetFilter} disabled={isLoading}>
              초기화
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pb-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-revenue"
            checked={showRevenue}
            onCheckedChange={(checked) => setShowRevenue(checked === true)}
          />
          <Label
            htmlFor="show-revenue"
            className="text-sm font-normal cursor-pointer"
          >
            매출액 표시
          </Label>
        </div>
      </div>

      <div className="h-[400px]">
        {isLoading && (
          <div className="h-full flex flex-col gap-4 p-4">
            <div className="flex items-end justify-between h-full gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <Skeleton 
                    className="w-full rounded-t-md" 
                    style={{ 
                      height: `${Math.random() * 60 + 40}%`,
                      minHeight: '60px'
                    }} 
                  />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <div className="flex justify-between px-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-destructive">데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        )}

        {!isLoading && !error && chartData.length > 0 && (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart 
              data={chartData} 
              margin={{ 
                top: 20, 
                right: showRevenue ? 80 : 50,
                left: 20, 
                bottom: 100 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="rangeFormatted"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
                className="text-xs"
              />
              <YAxis
                yAxisId="left"
                className="text-xs"
                label={{ value: '구매 수량', angle: -90, position: 'insideLeft' }}
              />
              {showRevenue && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  className="text-xs"
                  tickFormatter={formatRevenue}
                  width={70}
                  label={{ value: '매출액', angle: 90, position: 'insideRight' }}
                />
              )}
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `가격대: ${label}`}
                    indicator="dot"
                  />
                }
              />
              <Bar
                yAxisId="left"
                dataKey="count"
                name="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
              />
              {showRevenue && (
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  name="revenue"
                  fill="var(--color-revenue)"
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ChartContainer>
        )}

        {!isLoading && !error && chartData.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">표시할 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
