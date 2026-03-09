/**
 * API client for PULSE DR backend.
 * Set VITE_API_BASE_URL in .env (e.g. http://localhost:8000).
 */

const getBaseUrl = (): string =>
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") ?? "";

async function apiFetch<T>(path: string): Promise<T> {
  const base = getBaseUrl();
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// --- Types (match backend responses) ---

export interface CustomerDashboardKPIs {
  active_products: number;
  coverage_score_pct: number;
  assets_covered: number;
  assets_total: number;
  events_participated: number;
  total_curtailment_delivered_kw: number;
  total_revenue: number;
}

export interface CurtailmentByEventItem {
  event: string;
  kw: number;
}

export interface AssetHealthItem {
  status: string;
  count: number;
}

export interface CustomerDashboardResponse {
  kpis: CustomerDashboardKPIs;
  curtailment_by_event: CurtailmentByEventItem[];
  asset_health: AssetHealthItem[];
}

export interface AssetItem {
  id: number;
  name: string;
  site: string;
  asset_type: string;
  dispatchable_range: string;
  control_mode: string;
  coverage_status: string;
  readiness_indicator: string | null;
  not_covered_reason: string | null;
}

export interface EventItem {
  id: number;
  event_date: string;
  window: string;
  product: string;
  target_kw: number;
  delivered_kw: number;
  effectiveness_pct: number;
}

export interface StatementItem {
  id: number;
  statement_date: string;
  product: string;
  gross_curtailment_value: number;
  revenue_share: number;
  net_value: number;
  status: string;
}

export interface PayoutItem {
  id: number;
  payout_date: string;
  gross_statement_net: number;
  imbalance_penalty: number;
  adjustments: number;
  final_payout: number;
  status: string;
}

// --- API functions ---

export async function getCustomerDashboard(): Promise<CustomerDashboardResponse> {
  return apiFetch("/api/v1/dashboard/customer");
}

export async function getAssets(): Promise<{ items: AssetItem[] }> {
  return apiFetch("/api/v1/assets");
}

export async function getEvents(): Promise<{ items: EventItem[] }> {
  return apiFetch("/api/v1/events");
}

export async function getStatements(): Promise<{ items: StatementItem[] }> {
  return apiFetch("/api/v1/statements");
}

export async function getPayouts(): Promise<{ items: PayoutItem[] }> {
  return apiFetch("/api/v1/payouts");
}

export async function getPayout(id: number): Promise<PayoutItem> {
  return apiFetch(`/api/v1/payouts/${id}`);
}
