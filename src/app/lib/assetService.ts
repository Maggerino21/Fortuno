// src/app/lib/assetService.ts
import { supabase, Asset, AssetHistory } from './supabase';

export const assetService = {
  // Get all assets for the current user
  async getUserAssets() {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Asset[];
  },

  // Create a new asset
  async createAsset(asset: Omit<Asset, 'id' | 'user_id' | 'last_updated' | 'created_at'>) {
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
    
    return data?.[0] as Asset;
  },

  // Update an asset
  async updateAsset(id: string, updates: Partial<Asset>) {
    const { data, error } = await supabase
      .from('assets')
      .update({
        ...updates,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    // Also create history record if value changed
    if (updates.value !== undefined) {
      await supabase
        .from('asset_history')
        .insert([{
          asset_id: id,
          value: updates.value
        }]);
    }
    
    return data?.[0] as Asset;
  },

  // Delete an asset
  async deleteAsset(id: string) {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Get asset history
  async getAssetHistory(assetId: string) {
    const { data, error } = await supabase
      .from('asset_history')
      .select('*')
      .eq('asset_id', assetId)
      .order('recorded_at', { ascending: true });
    
    if (error) throw error;
    return data as AssetHistory[];
  }
};