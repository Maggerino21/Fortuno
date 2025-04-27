// src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type Asset = {
  id: string;
  user_id: string;
  name: string;
  asset_type: 'cash' | 'investment' | 'real_estate' | 'crypto' | 'vehicle' | 'other';
  value: number;
  currency: string;
  acquisition_date?: string;
  description?: string;
  last_updated: string;
  created_at: string;
}

export type Liability = {
  id: string;
  user_id: string;
  name: string;
  liability_type: 'credit_card' | 'loan' | 'mortgage' | 'other';
  balance: number;
  currency: string;
  interest_rate?: number;
  payment_amount?: number;
  payment_frequency?: string;
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

export type LiabilityHistory = {
  id: string;
  liability_id: string;
  balance: number;
  recorded_at: string;
}

export type FinancialConnection = {
  id: string;
  user_id: string;
  provider: string;
  account_name: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  last_sync?: string;
  status: 'active' | 'error' | 'disconnected';
  created_at: string;
}