# 쇼핑몰 구매 데이터 대시보드

7월 한 달 동안의 구매 데이터를 시각화하고 분석하는 대시보드 애플리케이션입니다.

## 프로젝트 설정

### 필수 요구사항

- Node.js 20.13.1
- Yarn 1.22.22

### 설치 및 실행

```bash
# 루트 디렉토리에서
cd apps
yarn install

# 백엔드 서버 실행 (포트 4000)
yarn start-server

# 프론트엔드 개발 서버 실행 (별도 터미널)
yarn start-client
```

프론트엔드는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 기술 스택

### 프론트엔드

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **TanStack Query (React Query)** - 서버 상태 관리 및 데이터 페칭
- **Recharts** - 차트 라이브러리
- **date-fns** - 날짜 처리
- **Biome** - 린터 및 포매터
- **Vitest** - 테스트 프레임워크
- **React Testing Library** - 컴포넌트 테스트

## 프로젝트 구조

```
src/
├── api/              # API 클라이언트
│   ├── client.ts
│   └── queryKeys.ts
├── components/       # 재사용 가능한 컴포넌트
│   ├── PurchaseFrequencyChart.tsx
│   ├── CustomerList.tsx
│   ├── CustomerPurchaseModal.tsx
│   ├── layouts/      # 레이아웃 컴포넌트
│   │   └── DashboardLayout.tsx
│   └── ui/           # UI 컴포넌트 (shadcn/ui)
├── hooks/            # Custom React Hooks
│   ├── usePurchaseFrequency.ts
│   ├── useCustomers.ts
│   └── useCustomerPurchases.ts
├── pages/            # 페이지 컴포넌트
│   ├── Dashboard.tsx
│   ├── CustomersPage.tsx
│   └── PurchaseFrequencyPage.tsx
├── utils/            # 유틸리티 함수
│   ├── format.ts
│   ├── dateRange.ts
│   └── pagination.ts
├── test/             # 테스트 설정
│   └── setup.ts
├── types/            # TypeScript 타입 정의
│   └── api.ts
├── App.tsx           # 메인 앱 컴포넌트
└── main.tsx          # 진입점
```

## 주요 기능

1. **가격대별 구매 빈도 차트**
   - 바 차트로 가격대별 구매 수량 시각화
   - 날짜 범위 필터링 (단일 날짜 모드 포함)
   - 매출액 표시 옵션 (회색조 차트)
   - 단일 날짜 모드: 00:00:00 ~ 23:59:59 범위 조회

2. **고객 목록 및 검색**
   - 고객별 총 구매 횟수 및 금액 표시
   - 구매 금액 기준 정렬 (오름차순/내림차순)
   - ID 기준 정렬 (기본값)
   - 이름 기반 검색 기능
   - 페이지네이션 (페이지당 10개 항목)

3. **고객 상세 구매 내역**
   - 고객 Row 클릭 시 상세 구매 내역 모달 표시
   - 구매 날짜, 제품명, 가격, 썸네일 이미지 표시
   - 로딩 상태 및 에러 처리

## API 엔드포인트

백엔드 서버는 `http://localhost:4000`에서 실행됩니다.

- `GET /api/purchase-frequency` - 가격대별 구매 빈도
  - Query params: `from` (ISO 8601), `to` (ISO 8601)
- `GET /api/customers` - 고객 목록
  - Query params: `sortBy` (asc/desc), `name` (검색어)
- `GET /api/customers/:id/purchases` - 특정 고객의 구매 내역

## 개발 스크립트

```bash
# apps/frontend 폴더에서 실행

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 빌드 미리보기
yarn preview

# Biome 린트 체크
yarn lint:biome

# Biome 포맷팅
yarn format

# 테스트 실행
yarn test

# 테스트 UI 모드
yarn test:ui

# 테스트 커버리지
yarn test:coverage
```

## 주의사항

- `apps/backend` 폴더 내의 코드는 수정하지 마세요.
- 백엔드 서버가 실행 중이어야 프론트엔드가 정상적으로 작동합니다.


