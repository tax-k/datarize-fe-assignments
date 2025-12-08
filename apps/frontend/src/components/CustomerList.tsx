import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useCustomers } from "@/hooks/useCustomers";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";

interface CustomerListProps {
	onCustomerClick: (customerId: number) => void;
}

type SortOrder = "id" | "asc" | "desc";

const ITEMS_PER_PAGE = 10;

export function CustomerList({ onCustomerClick }: CustomerListProps) {
	const [searchName, setSearchName] = useState<string>("");
	const [sortOrder, setSortOrder] = useState<SortOrder>("id");
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data, isLoading, error } = useCustomers({
		name: searchName || undefined,
		sortBy: sortOrder === "id" ? undefined : sortOrder,
	});

	// 클라이언트 사이드에서 ID 정렬 (서버는 sortBy가 없을 때 ID 정렬을 보장하지 않을 수 있음)
	const sortedData = useMemo(() => {
		if (!data) return [];
		if (sortOrder === "id") {
			return [...data].sort((a, b) => a.id - b.id);
		}
		return data; // 서버에서 이미 정렬됨
	}, [data, sortOrder]);

	// 페이지네이션 계산
	const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedData = sortedData.slice(startIndex, endIndex);

	// 검색이나 정렬이 변경되면 첫 페이지로 리셋
	const handleSearch = (value: string) => {
		setSearchName(value);
		setCurrentPage(1);
	};

	const handleSortChange = (value: string) => {
		setSortOrder(value as SortOrder);
		setCurrentPage(1);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("ko-KR", {
			style: "currency",
			currency: "KRW",
		}).format(amount);
	};

	return (
		<div className="space-y-4">
			{/* 검색 및 정렬 컨트롤 */}
			<div className="flex flex-wrap items-center gap-4 pb-4 border-b">
				<div className="flex-1 min-w-[200px]">
					<Input
						placeholder="고객 이름으로 검색..."
						value={searchName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleSearch(e.target.value)
						}
						className="w-full"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Select value={sortOrder} onValueChange={handleSortChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="정렬 기준" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="id">ID 순</SelectItem>
							<SelectItem value="asc">구매 금액 (낮은 순)</SelectItem>
							<SelectItem value="desc">구매 금액 (높은 순)</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* 테이블 */}
			<div className="border rounded-md">
				{isLoading && (
					<div className="p-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>이름</TableHead>
									<TableHead className="text-right">총 구매 횟수</TableHead>
									<TableHead className="text-right">총 구매 금액</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Array.from({ length: 10 }).map((_, index) => (
									<TableRow key={`skeleton-${index}`}>
										<TableCell>
											<Skeleton className="h-4 w-12" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-24" />
										</TableCell>
										<TableCell className="text-right">
											<Skeleton className="h-4 w-16 ml-auto" />
										</TableCell>
										<TableCell className="text-right">
											<Skeleton className="h-4 w-20 ml-auto" />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}

				{error && (
					<div className="flex items-center justify-center py-12">
						<p className="text-destructive">
							데이터를 불러오는 중 오류가 발생했습니다.
						</p>
					</div>
				)}

				{!isLoading && !error && sortedData.length === 0 && (
					<div className="flex items-center justify-center py-12">
						<p className="text-muted-foreground">검색 결과가 없습니다.</p>
					</div>
				)}

				{!isLoading && !error && sortedData.length > 0 && (
					<>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>이름</TableHead>
									<TableHead className="text-right">총 구매 횟수</TableHead>
									<TableHead className="text-right">총 구매 금액</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedData.map((customer) => (
									<TableRow
										key={customer.id}
										onClick={() => onCustomerClick(customer.id)}
										className="cursor-pointer hover:bg-muted/50 transition-colors"
									>
										<TableCell className="font-medium">{customer.id}</TableCell>
										<TableCell>{customer.name}</TableCell>
										<TableCell className="text-right">
											{customer.count}회
										</TableCell>
										<TableCell className="text-right font-semibold">
											{formatCurrency(customer.totalAmount)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{/* 페이지네이션 */}
						{totalPages > 1 && (
							<div className="flex items-center justify-between px-4 py-4 border-t">
								<div className="text-sm text-muted-foreground">
									{startIndex + 1}-{Math.min(endIndex, sortedData.length)} /{" "}
									{sortedData.length}개
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
										disabled={currentPage === 1}
									>
										<ChevronLeftIcon className="h-4 w-4" />
										이전
									</Button>
									<div className="flex items-center gap-1">
										{Array.from({ length: totalPages }, (_, i) => i + 1).map(
											(page) => {
												// 현재 페이지 주변 2페이지씩만 표시
												if (
													page === 1 ||
													page === totalPages ||
													(page >= currentPage - 2 && page <= currentPage + 2)
												) {
													return (
														<Button
															key={page}
															variant={
																currentPage === page ? "default" : "outline"
															}
															size="sm"
															onClick={() => setCurrentPage(page)}
															className="min-w-[40px]"
														>
															{page}
														</Button>
													);
												}
												if (
													page === currentPage - 3 ||
													page === currentPage + 3
												) {
													return (
														<span
															key={page}
															className="px-2 text-muted-foreground"
														>
															...
														</span>
													);
												}
												return null;
											},
										)}
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) => Math.min(totalPages, prev + 1))
										}
										disabled={currentPage === totalPages}
									>
										다음
										<ChevronRightIcon className="h-4 w-4" />
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
