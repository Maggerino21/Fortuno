import { dataEntryService } from './dataEntryService'; 
import { supabase } from './supabase'; // Add this import

export const setupService = {
  async completeInitialSetup(userData: {
    assets: Array<{
      name: string;
      asset_type: string;
      value: number;
    }>;
    liabilities: Array<{
      name: string;
      liability_type: string;
      balance: number;
    }>;
  }) {
    // Add user assets
    await dataEntryService.bulkAddAssets(
      userData.assets.map(asset => ({
        ...asset,
        asset_type: asset.asset_type as "cash" | "investment" | "real_estate" | "crypto" | "vehicle" | "other"
      }))
    );
    
    // Add user liabilities
    await dataEntryService.bulkAddLiabilities(
      userData.liabilities.map(liability => ({
        ...liability,
        liability_type: liability.liability_type as "other" | "credit_card" | "loan" | "mortgage"
      }))
    );
    
    // Update user profile to mark setup as complete
    await supabase
      .from('profiles')
      .update({ setup_completed: true })
      .eq('id', (await supabase.auth.getUser()).data?.user?.id);
      
    return true;
  }
};