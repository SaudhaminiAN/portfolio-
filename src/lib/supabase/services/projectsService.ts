/**
 * Projects Data Service
 * Decouples Supabase data persistence from UI components.
 * Provides fallback to local feature data when offline or unconfigured.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';
import { ProjectItem } from '../../../features/projects/types';
import { SELECTED_PROJECTS } from '../../../features/projects/data';

type ProjectRow = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

function mapRowToProject(row: ProjectRow): ProjectItem {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    overview: row.overview,
    problemStatement: row.problem_statement,
    proposedSolution: row.proposed_solution,
    architecture: (row.architecture as Array<{ title: string; description: string }>) || [],
    techStack: row.tech_stack || [],
    keyImplementations: row.key_implementations || [],
    githubUrl: row.github_url || undefined,
    demoUrl: row.demo_url || undefined,
    image: row.image || undefined,
    tags: row.tags || [],
  };
}

export const projectsService = {
  /**
   * Fetches published projects for the public portfolio.
   * Falls back gracefully to local static records if Supabase is unconfigured.
   */
  async getPublishedProjects(): Promise<ProjectItem[]> {
    if (!isSupabaseConfigured()) {
      return SELECTED_PROJECTS;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return SELECTED_PROJECTS;
      }

      return (data as ProjectRow[]).map(mapRowToProject);
    } catch {
      return SELECTED_PROJECTS;
    }
  },

  /**
   * Fetches all projects (including drafts) for the admin dashboard.
   */
  async getAllProjects(): Promise<ProjectRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data as ProjectRow[]) || [];
  },

  /**
   * Fetches a single project by ID
   */
  async getProjectById(id: string): Promise<ProjectItem | null> {
    if (!isSupabaseConfigured()) {
      return SELECTED_PROJECTS.find((p: ProjectItem) => p.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return SELECTED_PROJECTS.find((p: ProjectItem) => p.id === id) || null;
      }

      return mapRowToProject(data as ProjectRow);
    } catch {
      return SELECTED_PROJECTS.find((p: ProjectItem) => p.id === id) || null;
    }
  },

  /**
   * Inserts or updates a project (Admin only)
   */
  async upsertProject(project: ProjectInsert): Promise<ProjectRow> {
    const { data, error } = await supabase
      .from('projects')
      .upsert(project as any)
      .select()
      .single();

    if (error) throw error;
    return data as ProjectRow;
  },

  /**
   * Deletes a project by ID (Admin only)
   */
  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },
};
