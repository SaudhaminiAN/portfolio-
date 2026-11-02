/**
 * Media & Document Storage Service
 * Manages image uploads, document attachments (e.g. Resume PDF),
 * and CDN asset delivery via Supabase Storage.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';

type MediaAssetRow = Database['public']['Tables']['media_assets']['Row'];

const BUCKET_NAME = 'portfolio-media';

export const mediaService = {
  /**
   * Uploads an asset (image or PDF) to Supabase Storage and records metadata
   */
  async uploadFile(file: File, folder: 'images' | 'documents' | 'projects' = 'images'): Promise<{ url: string; path: string }> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase Storage is not configured. Configure credentials in .env.local');
    }

    const fileExt = file.name.split('.').pop() || '';
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    // Save record to media_assets metadata table
    try {
      await supabase.from('media_assets').insert({
        file_name: file.name,
        file_url: publicUrlData.publicUrl,
        file_type: file.type || fileExt,
        size_bytes: file.size,
        alt_text: file.name,
      } as any);
    } catch {
      // Non-blocking metadata log failure
    }

    return {
      url: publicUrlData.publicUrl,
      path: filePath,
    };
  },

  /**
   * Retrieves public URL for a given path
   */
  getPublicUrl(path: string): string {
    if (!isSupabaseConfigured()) return path;
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    return data.publicUrl;
  },

  /**
   * Lists media asset catalog records
   */
  async getMediaAssets(): Promise<MediaAssetRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as MediaAssetRow[]) || [];
  },

  /**
   * Deletes a media file from Supabase Storage & catalog
   */
  async deleteMedia(id: string, storagePath?: string): Promise<void> {
    if (storagePath) {
      await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    }
    const { error } = await supabase.from('media_assets').delete().eq('id', id);
    if (error) throw error;
  },
};
