/**
 * Blog & Articles Data Service
 * Decouples technical publications and articles persistence from UI components.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';
import { BlogPost } from '../../../features/blog/types';
import { BLOG_POSTS, MEDIUM_RSS_API_URL } from '../../../features/blog/data';

type BlogRow = Database['public']['Tables']['blog_posts']['Row'];
type BlogInsert = Database['public']['Tables']['blog_posts']['Insert'];

function mapRowToBlogPost(row: BlogRow): BlogPost {
  const match = BLOG_POSTS.find((p) => p.id === row.id || p.id === row.slug);
  return {
    id: row.slug || row.id,
    title: row.title,
    subtitle: match?.subtitle || row.excerpt,
    category: (row.category as BlogPost['category']) || 'Machine Learning',
    date: row.date,
    readTime: row.read_time,
    summary: row.excerpt,
    content: Array.isArray(row.content) ? row.content : [String(row.content)],
    tags: row.tags || [],
    mediumUrl: match?.mediumUrl,
    coverImage: match?.coverImage,
  };
}

function formatMediumDate(pubDate: string): string {
  try {
    const d = new Date(pubDate.replace(' ', 'T') + 'Z');
    if (isNaN(d.getTime())) return pubDate;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return pubDate;
  }
}

export const blogService = {
  /**
   * Fetches published Medium articles from @saudhaminiupdated live RSS feed,
   * enriched with local high-res cover images & structured summaries.
   */
  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(MEDIUM_RSS_API_URL);
      if (response.ok) {
        const json = await response.json();
        if (json?.status === 'ok' && Array.isArray(json.items) && json.items.length > 0) {
          const livePosts: BlogPost[] = json.items.map((item: any, idx: number) => {
            const cleanUrl = (item.link || '').split('?')[0];
            const existing = BLOG_POSTS.find(
              (b) =>
                b.mediumUrl === cleanUrl ||
                b.title.toLowerCase().trim() === (item.title || '').toLowerCase().trim()
            );

            if (existing) {
              return existing;
            }

            const imgMatch = (item.description || item.content || '').match(
              /<img[^>]+src="([^">]+)"/
            );
            const rawParagraphs = (item.content || item.description || '')
              .split(/<\/p>|<\/h3>|<\/h4>/)
              .map((p: string) =>
                p
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()
              )
              .filter((p: string) => p.length > 40);

            const categories: string[] = Array.isArray(item.categories)
              ? item.categories
              : ['Machine Learning'];

            return {
              id: `medium-live-${idx}`,
              title: item.title || 'Untitled Medium Article',
              subtitle: rawParagraphs[0] || 'Published by Saudhamini A N on Medium',
              category: categories[0]
                ? categories[0]
                    .split('-')
                    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')
                : 'AI & ML',
              date: formatMediumDate(item.pubDate || ''),
              readTime: `${Math.max(4, Math.min(8, Math.ceil(rawParagraphs.length / 3)))} min read`,
              mediumUrl: cleanUrl,
              coverImage:
                imgMatch?.[1] ||
                item.thumbnail ||
                BLOG_POSTS[idx % BLOG_POSTS.length]?.coverImage,
              summary:
                rawParagraphs[0] ||
                'Technical article published by Saudhamini A N on Medium.',
              content:
                rawParagraphs.length > 0
                  ? rawParagraphs.slice(0, 6)
                  : ['Read the complete article directly on Medium.'],
              tags: categories.map((c: string) =>
                c
                  .split('-')
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')
              ),
            };
          });

          return livePosts.slice(0, 4);
        }
      }
    } catch {
      // Fallback to curated BLOG_POSTS if offline or rate-limited
    }

    if (!isSupabaseConfigured()) {
      return BLOG_POSTS.slice(0, 4);
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .limit(4);

      if (error || !data || data.length === 0) {
        return BLOG_POSTS.slice(0, 4);
      }

      return (data as BlogRow[]).map(mapRowToBlogPost).slice(0, 4);
    } catch {
      return BLOG_POSTS.slice(0, 4);
    }
  },

  /**
   * Fetches single post by slug/id
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) {
      return BLOG_POSTS.find((p: BlogPost) => p.id === slug) || null;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return BLOG_POSTS.find((p: BlogPost) => p.id === slug) || null;
      }

      return mapRowToBlogPost(data as BlogRow);
    } catch {
      return BLOG_POSTS.find((p: BlogPost) => p.id === slug) || null;
    }
  },

  /**
   * Admin operations
   */
  async getAllBlogPosts(): Promise<BlogRow[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as BlogRow[]) || [];
  },

  async upsertBlogPost(post: BlogInsert): Promise<BlogRow> {
    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(post as any)
      .select()
      .single();

    if (error) throw error;
    return data as BlogRow;
  },

  async deleteBlogPost(id: string): Promise<void> {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
  },
};
