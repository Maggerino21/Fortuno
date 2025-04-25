// src/app/lib/dataEntryService.ts
import { assetService } from './assetService';
import { liabilityService } from './liabilityService';
import { Asset, Liability } from './supabase'; // Add this import

export const dataEntryService = {
  // Add multiple assets at once (for initial setup)
  async bulkAddAssets(assets: Array<{
    name: string;
    asset_type: Asset['asset_type']; // Use the type from Asset definition
    value: number;
    currency?: string;
    description?: string;
  }>) {
    const results = [];
    
    for (const asset of assets) {
      const result = await assetService.createAsset({
        ...asset,
        currency: asset.currency ?? 'USD' // Provide a default value for currency
      });
      results.push(result);
    }
    
    return results;
  },
  
  // Add multiple liabilities at once
  async bulkAddLiabilities(liabilities: Array<{
    name: string;
    liability_type: Liability['liability_type']; // Use the type from Liability definition
    balance: number;
    currency?: string;
    interest_rate?: number;
    description?: string;
  }>) {
    const results = [];
    
    for (const liability of liabilities) {
      const result = await liabilityService.createLiability({
        ...liability,
        currency: liability.currency ?? 'USD' // Provide a default value for currency
      });
      results.push(result);
    }
    
    return results;
  }
};