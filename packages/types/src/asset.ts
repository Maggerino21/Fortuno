export type Asset = {
  id: string;
  user_id: string;
  name: string;
  asset_type: "cash" | "investment" | "real_estate" | "crypto" | "vehicle" | "other";
  value: number;
  currency: string;
  acquisition_date?: string;
  description?: string;
  last_updated: string;
  created_at: string;
}

export type AssetHistory = {
  id: string;
  asset_id: string;
  value: number;
  recorded_at: string;
}