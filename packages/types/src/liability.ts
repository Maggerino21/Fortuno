export type Liability = {
  id: string;
  user_id: string;
  name: string;
  liability_type: "credit_card" | "loan" | "mortgage" | "other";
  balance: number;
  currency: string;
  interest_rate?: number;
  payment_amount?: number;
  payment_frequency?: string;
  description?: string;
  last_updated: string;
  created_at: string;
}

export type LiabilityHistory = {
  id: string;
  liability_id: string;
  balance: number;
  recorded_at: string;
}