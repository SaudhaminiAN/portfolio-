/**
 * Education & Certifications Data Service
 * Decouples educational background and credential records from UI components.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';
import { EducationItem, CertificationItem } from '../../../features/education/types';
import { EDUCATION_LIST, CERTIFICATIONS_LIST } from '../../../features/education/data';

type EducationRow = Database['public']['Tables']['education']['Row'];
type EducationInsert = Database['public']['Tables']['education']['Insert'];
type CertificationRow = Database['public']['Tables']['certifications']['Row'];
type CertificationInsert = Database['public']['Tables']['certifications']['Insert'];

function mapRowToEducation(row: EducationRow): EducationItem {
  const isSchoolLevel = row.degree.toLowerCase().includes('higher secondary');
  const defaultStatus = isSchoolLevel ? 'Completed' : 'Graduated';
  const rawPeriod = row.period?.trim() || '';
  const normalizedStatus =
    !rawPeriod ||
    rawPeriod.toLowerCase().includes('pursuing') ||
    rawPeriod.toLowerCase().includes('completed') ||
    rawPeriod.toLowerCase().includes('graduated')
      ? defaultStatus
      : rawPeriod;

  return {
    degree: row.degree,
    institution: row.institution,
    period: normalizedStatus,
    status: normalizedStatus,
    description: row.description,
  };
}

function mapRowToCertification(row: CertificationRow): CertificationItem {
  return {
    title: row.title,
    issuer: row.issuer,
    type: row.year ? `Issued ${row.year}` : 'Certified Credential',
    skills: row.skills_covered || [],
  };
}

export const educationService = {
  /**
   * Fetches published education degrees
   */
  async getPublishedEducation(): Promise<EducationItem[]> {
    if (!isSupabaseConfigured()) {
      return EDUCATION_LIST;
    }

    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return EDUCATION_LIST;
      }

      return (data as EducationRow[]).map(mapRowToEducation);
    } catch {
      return EDUCATION_LIST;
    }
  },

  /**
   * Fetches published certifications
   */
  async getPublishedCertifications(): Promise<CertificationItem[]> {
    if (!isSupabaseConfigured()) {
      return CERTIFICATIONS_LIST;
    }

    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return CERTIFICATIONS_LIST;
      }

      return (data as CertificationRow[]).map(mapRowToCertification);
    } catch {
      return CERTIFICATIONS_LIST;
    }
  },

  /**
   * Admin operations
   */
  async getAllEducation(): Promise<EducationRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return (data as EducationRow[]) || [];
  },

  async upsertEducation(record: EducationInsert): Promise<EducationRow> {
    const { data, error } = await supabase
      .from('education')
      .upsert(record as any)
      .select()
      .single();
    if (error) throw error;
    return data as EducationRow;
  },

  async deleteEducation(id: string): Promise<void> {
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) throw error;
  },

  async getAllCertifications(): Promise<CertificationRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return (data as CertificationRow[]) || [];
  },

  async upsertCertification(cert: CertificationInsert): Promise<CertificationRow> {
    const { data, error } = await supabase
      .from('certifications')
      .upsert(cert as any)
      .select()
      .single();
    if (error) throw error;
    return data as CertificationRow;
  },

  async deleteCertification(id: string): Promise<void> {
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (error) throw error;
  },
};
