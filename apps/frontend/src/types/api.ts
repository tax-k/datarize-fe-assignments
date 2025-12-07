//NOTE:  API response type
export interface Product {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

export interface Customer {
  id: number;
  name: string;
}

export interface Purchase {
  productId: number;
  customerId: number;
  quantity: number;
  date: string;
}

export interface CustomerStats {
  id: number;
  name: string;
  count: number; // 총 구매 횟수
  totalAmount: number; // 총 구매 금액
}

export interface PurchaseFrequency {
  range: string; // 예: "0 - 20000"
  count: number;
}

export interface CustomerPurchaseDetail {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}

