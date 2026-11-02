/**
 * Skills Data Service
 * Decouples skills categories persistence from UI components.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';
import { SkillCategory } from '../../../features/skills/types';
import { SKILL_CATEGORIES } from '../../../features/skills/data';

type SkillRow = Database['public']['Tables']['skills']['Row'];
type SkillInsert = Database['public']['Tables']['skills']['Insert'];

function mapRowToSkillCategory(row: SkillRow): SkillCategory {
  const match = SKILL_CATEGORIES.find((c) => c.id === row.category_id || c.id === row.id);
  return {
    id: row.category_id || row.id,
    name: row.category_title,
    description: match?.description || '',
    skills: row.items || [],
  };
}

export const skillsService = {
  /**
   * Fetches published skills grouped by category
   */
  async getPublishedSkills(): Promise<SkillCategory[]> {
    if (!isSupabaseConfigured()) {
      return SKILL_CATEGORIES;
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return SKILL_CATEGORIES;
      }

      return (data as SkillRow[]).map(mapRowToSkillCategory);
    } catch {
      return SKILL_CATEGORIES;
    }
  },

  /**
   * Fetches all skills (Admin only)
   */
  async getAllSkills(): Promise<SkillRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data as SkillRow[]) || [];
  },

  /**
   * Upserts a skill category (Admin only)
   */
  async upsertSkill(skill: SkillInsert): Promise<SkillRow> {
    const { data, error } = await supabase
      .from('skills')
      .upsert(skill as any)
      .select()
      .single();

    if (error) throw error;
    return data as SkillRow;
  },

  /**
   * Deletes a skill category (Admin only)
   */
  async deleteSkill(id: string): Promise<void> {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
  },
};
