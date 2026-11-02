/**
 * Supabase Database & Entity Definitions for Saudhamini A N Portfolio Platform
 * 
 * Defines PostgreSQL table structures, JSON column schemas,
 * and client-facing entity mappings.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ProjectArchitectureItem {
  title: string;
  description: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          number: string;
          title: string;
          subtitle: string;
          category: string;
          overview: string;
          problem_statement: string;
          proposed_solution: string;
          architecture: ProjectArchitectureItem[];
          tech_stack: string[];
          key_implementations: string[];
          github_url: string;
          demo_url: string;
          image: string;
          tags: string[];
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          number: string;
          title: string;
          subtitle: string;
          category: string;
          overview: string;
          problem_statement: string;
          proposed_solution: string;
          architecture?: ProjectArchitectureItem[];
          tech_stack?: string[];
          key_implementations?: string[];
          github_url?: string;
          demo_url?: string;
          image?: string;
          tags?: string[];
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          number?: string;
          title?: string;
          subtitle?: string;
          category?: string;
          overview?: string;
          problem_statement?: string;
          proposed_solution?: string;
          architecture?: ProjectArchitectureItem[];
          tech_stack?: string[];
          key_implementations?: string[];
          github_url?: string;
          demo_url?: string;
          image?: string;
          tags?: string[];
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      experiences: {
        Row: {
          id: string;
          role: string;
          company: string;
          location: string;
          period: string;
          duration: string;
          is_current: boolean;
          responsibilities: string[];
          technologies: string[];
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          company: string;
          location: string;
          period: string;
          duration: string;
          is_current?: boolean;
          responsibilities?: string[];
          technologies?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          company?: string;
          location?: string;
          period?: string;
          duration?: string;
          is_current?: boolean;
          responsibilities?: string[];
          technologies?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      skills: {
        Row: {
          id: string;
          category_id: string;
          category_title: string;
          items: string[];
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          category_title: string;
          items?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          category_title?: string;
          items?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      education: {
        Row: {
          id: string;
          degree: string;
          institution: string;
          location: string;
          period: string;
          description: string;
          key_modules: string[];
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          degree: string;
          institution: string;
          location: string;
          period: string;
          description: string;
          key_modules?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          degree?: string;
          institution?: string;
          location?: string;
          period?: string;
          description?: string;
          key_modules?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          year: string;
          credential_id: string;
          credential_url: string;
          skills_covered: string[];
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          year: string;
          credential_id?: string;
          credential_url?: string;
          skills_covered?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          year?: string;
          credential_id?: string;
          credential_url?: string;
          skills_covered?: string[];
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      ai_experiments: {
        Row: {
          id: string;
          number: string;
          title: string;
          category: string;
          status: string;
          description: string;
          findings: string[];
          tools_used: string[];
          code_snippet: string | null;
          demo_link: string | null;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          number: string;
          title: string;
          category: string;
          status: string;
          description: string;
          findings?: string[];
          tools_used?: string[];
          code_snippet?: string | null;
          demo_link?: string | null;
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          number?: string;
          title?: string;
          category?: string;
          status?: string;
          description?: string;
          findings?: string[];
          tools_used?: string[];
          code_snippet?: string | null;
          demo_link?: string | null;
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          date: string;
          read_time: string;
          excerpt: string;
          content: string[];
          tags: string[];
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          date: string;
          read_time: string;
          excerpt: string;
          content: string[];
          tags?: string[];
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: string;
          date?: string;
          read_time?: string;
          excerpt?: string;
          content?: string[];
          tags?: string[];
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: 'unread' | 'read' | 'archived';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: 'unread' | 'read' | 'archived';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          status?: 'unread' | 'read' | 'archived';
          created_at?: string;
        };
        Relationships: [];
      };

      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };

      media_assets: {
        Row: {
          id: string;
          file_name: string;
          file_url: string;
          file_type: string;
          size_bytes: number;
          alt_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          file_name: string;
          file_url: string;
          file_type: string;
          size_bytes: number;
          alt_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          file_name?: string;
          file_url?: string;
          file_type?: string;
          size_bytes?: number;
          alt_text?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;

  };
}
