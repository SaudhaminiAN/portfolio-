/**
 * AI Lab & Exploration Data Service
 * Decouples experimental prototypes and research notes from UI components.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';
import { AiExperiment } from '../../../features/ai-lab/types';
import { AI_EXPERIMENTS } from '../../../features/ai-lab/data';

type ExperimentRow = Database['public']['Tables']['ai_experiments']['Row'];
type ExperimentInsert = Database['public']['Tables']['ai_experiments']['Insert'];

function mapRowToExperiment(row: ExperimentRow): AiExperiment {
  return {
    id: row.id,
    category: row.category as AiExperiment['category'],
    title: row.title,
    description: row.description,
    toolsUsed: row.tools_used || [],
    findings: Array.isArray(row.findings) ? row.findings.join(' ') : String(row.findings || ''),
    demoSnippet: row.code_snippet || undefined,
    date: row.created_at ? new Date(row.created_at).getFullYear().toString() : '2026',
    status: (row.status as AiExperiment['status']) || 'Completed',
  };
}

export const aiLabService = {
  /**
   * Fetches published AI experiments
   */
  async getPublishedExperiments(): Promise<AiExperiment[]> {
    if (!isSupabaseConfigured()) {
      return AI_EXPERIMENTS;
    }

    try {
      const { data, error } = await supabase
        .from('ai_experiments')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return AI_EXPERIMENTS;
      }

      return (data as ExperimentRow[]).map(mapRowToExperiment);
    } catch {
      return AI_EXPERIMENTS;
    }
  },

  /**
   * Fetches all experiments (Admin only)
   */
  async getAllExperiments(): Promise<ExperimentRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('ai_experiments')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data as ExperimentRow[]) || [];
  },

  /**
   * Upserts an AI experiment (Admin only)
   */
  async upsertExperiment(experiment: ExperimentInsert): Promise<ExperimentRow> {
    const { data, error } = await supabase
      .from('ai_experiments')
      .upsert(experiment as any)
      .select()
      .single();

    if (error) throw error;
    return data as ExperimentRow;
  },

  /**
   * Deletes an experiment (Admin only)
   */
  async deleteExperiment(id: string): Promise<void> {
    const { error } = await supabase.from('ai_experiments').delete().eq('id', id);
    if (error) throw error;
  },
};
