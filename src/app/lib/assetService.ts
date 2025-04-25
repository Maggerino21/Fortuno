// src/app/lib/assetService.ts
import { supabase } from './supabase';

// Don't use the imported types that are causing problems

export const assetService = {
  // Get all assets for the current user
  async getUserAssets() {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create a new asset with explicit typing
  async createAsset(asset: {
    name: string;
    asset_type: 'cash' | 'investment' | 'real_estate' | 'crypto' | 'vehicle' | 'other';
    value: number;
    currency: string;
    description?: string;
    acquisition_date?: string;
  }) {
    const { data, error } = await supabase
      .from('assets')
      .insert([asset])
      .select();
    
    if (error) throw error;
    
    // Also create initial history record
    if (data && data[0]) {
      await supabase
        .from('asset_history')
        .insert([{
          asset_id: data[0].id,
          value: asset.value
        }]);
    }
    
    return data?.[0];
  },

  // The rest of your methods, with simplified typing
  async updateAsset(id: string, updates: any) {
    const { data, error } = await supabase
      .from('assets')
      .update({
        ...updates,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    // Create history record if value changed
    if (updates.value !== undefined) {
      await supabase
        .from('asset_history')
        .insert([{
          asset_id: id,
          value: updates.value
        }]);
    }
    
    return data?.[0];
  },

  async deleteAsset(id: string) {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  async getAssetHistory(assetId: string) {
    const { data, error } = await supabase
      .from('asset_history')
      .select('*')
      .eq('asset_id', assetId)
      .order('recorded_at', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};