/**
 * Website Settings & Global Configurations Service
 * Allows dynamic updates of contact email, resume link, availability status, etc.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Json } from '../types';

interface SiteSettingRow {
  key: string;
  value: Json;
  updated_at: string;
}

export const settingsService = {
  /**
   * Retrieves a setting by key, with typed fallback
   */
  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    if (!isSupabaseConfigured()) {
      return defaultValue;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error || !data || (data as { value?: Json }).value === null) {
        return defaultValue;
      }

      return (data as { value: Json }).value as unknown as T;
    } catch {
      return defaultValue;
    }
  },

  /**
   * Updates or inserts a website setting (Admin only)
   */
  async updateSetting(key: string, value: Json): Promise<void> {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        key,
        value,
        updated_at: new Date().toISOString(),
      } as any);

    if (error) throw error;
  },

  /**
   * Retrieves all website settings as a key-value record
   */
  async getAllSettings(): Promise<Record<string, unknown>> {
    if (!isSupabaseConfigured()) return {};

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error || !data) return {};

      const result: Record<string, unknown> = {};
      (data as SiteSettingRow[]).forEach((row) => {
        result[row.key] = row.value;
      });
      return result;
    } catch {
      return {};
    }
  },
};
