/**
 * Experience Data Service
 * Decouples career timeline persistence from UI components.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';
import { ExperienceItem } from '../../../features/experience/types';
import { EXPERIENCES } from '../../../features/experience/data';

type ExperienceRow = Database['public']['Tables']['experiences']['Row'];
type ExperienceInsert = Database['public']['Tables']['experiences']['Insert'];

function mapRowToExperience(row: ExperienceRow): ExperienceItem {
  const match = EXPERIENCES.find((e) => e.id === row.id);
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    location: row.location,
    type: match?.type || (row.is_current ? 'Full-time / Leadership' : 'Professional Experience'),
    summary: match?.summary || (row.duration ? `${row.duration} • ${row.location}` : row.location),
    responsibilities: row.responsibilities || [],
    technologies: row.technologies || [],
  };
}

export const experienceService = {
  /**
   * Fetches published career experience.
   * Falls back gracefully to local static records if Supabase is unconfigured.
   */
  async getPublishedExperiences(): Promise<ExperienceItem[]> {
    if (!isSupabaseConfigured()) {
      return EXPERIENCES;
    }

    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return EXPERIENCES;
      }

      return (data as ExperienceRow[]).map(mapRowToExperience);
    } catch {
      return EXPERIENCES;
    }
  },

  /**
   * Fetches all experience entries (Admin only)
   */
  async getAllExperiences(): Promise<ExperienceRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data as ExperienceRow[]) || [];
  },

  /**
   * Upserts an experience record (Admin only)
   */
  async upsertExperience(experience: ExperienceInsert): Promise<ExperienceRow> {
    const { data, error } = await supabase
      .from('experiences')
      .upsert(experience as any)
      .select()
      .single();

    if (error) throw error;
    return data as ExperienceRow;
  },

  /**
   * Deletes an experience record (Admin only)
   */
  async deleteExperience(id: string): Promise<void> {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
  },
};
