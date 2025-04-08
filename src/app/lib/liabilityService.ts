// src/app/lib/liabilityService.ts
import { supabase, Liability, LiabilityHistory } from './supabase';

export const liabilityService = {
  // Get all liabilities for the current user
  async getUserLiabilities() {
    const { data, error } = await supabase
      .from('liabilities')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Liability[];
  },

  // Create a new liability
  async createLiability(liability: Omit<Liability, 'id' | 'user_id' | 'last_updated' | 'created_at'>) {
    const { data, error } = await supabase
      .from('liabilities')
      .insert([liability])
      .select();
    
    if (error) throw error;
    
    // Also create initial history record
    if (data && data[0]) {
      await supabase
        .from('liability_history')
        .insert([{
          liability_id: data[0].id,
          balance: liability.balance
        }]);
    }
    
    return data?.[0] as Liability;
  },

  // Update a liability
  async updateLiability(id: string, updates: Partial<Liability>) {
    const { data, error } = await supabase
      .from('liabilities')
      .update({
        ...updates,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    // Also create history record if balance changed
    if (updates.balance !== undefined) {
      await supabase
        .from('liability_history')
        .insert([{
          liability_id: id,
          balance: updates.balance
        }]);
    }
    
    return data?.[0] as Liability;
  },

  // Delete a liability
  async deleteLiability(id: string) {
    const { error } = await supabase
      .from('liabilities')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Get liability history
  async getLiabilityHistory(liabilityId: string) {
    const { data, error } = await supabase
      .from('liability_history')
      .select('*')
      .eq('liability_id', liabilityId)
      .order('recorded_at', { ascending: true });
    
    if (error) throw error;
    return data as LiabilityHistory[];
  },

  // Get total liabilities amount
  async getTotalLiabilities() {
    const { data, error } = await supabase
      .from('liabilities')
      .select('balance, currency');
    
    if (error) throw error;
    
    // Sum up all liabilities (assuming same currency for simplicity)
    // In a real app, you'd need to handle currency conversion
    return data.reduce((sum, liability) => sum + Number(liability.balance), 0);
  },

  // Get liabilities by type
  async getLiabilitiesByType() {
    const { data, error } = await supabase
      .from('liabilities')
      .select('liability_type, balance');
    
    if (error) throw error;
    
    // Group by type and sum
    const result: Record<string, number> = {};
    data.forEach(item => {
      const type = item.liability_type;
      result[type] = (result[type] || 0) + Number(item.balance);
    });
    
    return result;
  },

  // Get monthly changes in total liabilities
  async getMonthlyLiabilityChanges(months: number = 6) {
    // Calculate start date (6 months ago by default)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    
    const { data, error } = await supabase
      .from('liability_history')
      .select(`
        liability_id,
        balance,
        recorded_at
      `)
      .gte('recorded_at', startDate.toISOString())
      .order('recorded_at', { ascending: true });
    
    if (error) throw error;
    
    // Process the data to get monthly totals
    // This is a simplified approach - in a real app you'd use SQL aggregation
    const monthlyData: Record<string, number> = {};
    
    data.forEach(record => {
      const date = new Date(record.recorded_at);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      // For simplicity, we're just using the latest record for each month
      // A more accurate approach would be to use the last record of each month
      monthlyData[monthYear] = Number(record.balance);
    });
    
    // Convert to array format for charts
    return Object.entries(monthlyData).map(([month, total]) => ({
      month,
      total
    }));
  }
};