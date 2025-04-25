// src/app/lib/netWorthService.ts
import { supabase } from './supabase';
import { assetService } from './assetService';
import { liabilityService } from './liabilityService';

export const netWorthService = {
  // Calculate current net worth
  async getCurrentNetWorth() {
    const assets = await assetService.getUserAssets();
    const liabilities = await liabilityService.getUserLiabilities();
    
    const totalAssets = assets.reduce((sum, asset) => sum + Number(asset.value), 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + Number(liability.balance), 0);
    
    return totalAssets - totalLiabilities;
  },
  
  // Get net worth history (for your trend chart)
  async getNetWorthHistory(months: number = 6) {
    // Calculate start date
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    
    // Get point-in-time snapshots
    const { data, error } = await supabase.rpc('calculate_historical_net_worth', {
      start_date: startDate.toISOString(),
      interval_type: 'month'
    });
    
    if (error) {
      console.error('Error calculating net worth history:', error);
      
      // Fallback calculation if the stored procedure isn't available
      return await calculateNetWorthHistoryManually(months);
    }
    
    return data;
  },
  
  // Get asset distribution (for your pie chart)
  async getAssetDistribution() {
    const assets = await assetService.getUserAssets();
    
    // Group by asset type
    const distribution: Record<string, number> = {};
    const totalAssets = assets.reduce((sum, asset) => sum + Number(asset.value), 0);
    
    assets.forEach(asset => {
      const type = asset.asset_type;
      distribution[type] = (distribution[type] || 0) + Number(asset.value);
    });
    
    // Convert to percentage
    const result = Object.entries(distribution).map(([type, value]) => ({
      name: type,
      value: Math.round((value / totalAssets) * 100)
    }));
    
    return result;
  }
};

// Helper function for manual calculation if needed
async function calculateNetWorthHistoryManually(months: number) {
  // Implementation that uses asset_history and liability_history tables
  // ...
}