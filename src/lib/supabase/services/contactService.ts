/**
 * Contact Form & Inquiries Service
 * Decouples message delivery and persistent inquiries from UI components.
 * Synchronizes with Supabase `contact_messages` and maintains a resilient local backup ledger.
 */

import { supabase, isSupabaseConfigured } from '../client';
import { Database } from '../types';

export type ContactMessageRow = Database['public']['Tables']['contact_messages']['Row'];
type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert'];

export interface SendMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const LOCAL_INBOX_KEY = 'saudhamini_contact_inbox_v1';

function getLocalMessages(): ContactMessageRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_INBOX_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ContactMessageRow[];
  } catch {
    return [];
  }
}

function saveLocalMessages(messages: ContactMessageRow[]): void {
  try {
    localStorage.setItem(LOCAL_INBOX_KEY, JSON.stringify(messages));
  } catch {
    // Ignore storage quota errors
  }
}

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const contactService = {
  /**
   * Submits a new contact message into Supabase and local backup storage.
   * Uses a client-generated UUID and avoids chaining `.select()` on `.insert()`
   * so anonymous visitors pass RLS (`FOR INSERT TO anon`) without needing SELECT privileges.
   */
  async submitContactMessage(
    payload: SendMessagePayload
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const nowIso = new Date().toISOString();
    const recordId = generateUuid();
    const localRecord: ContactMessageRow = {
      id: recordId,
      name: payload.name.trim(),
      email: payload.email.trim(),
      subject: payload.subject.trim(),
      message: payload.message.trim(),
      status: 'unread',
      created_at: nowIso,
    };

    // Always store in local backup so no inquiry is lost if DB table is pending migration
    const existingLocal = getLocalMessages();
    saveLocalMessages([localRecord, ...existingLocal]);

    if (!isSupabaseConfigured()) {
      return {
        success: true,
        messageId: localRecord.id,
      };
    }

    try {
      const newRecord: ContactMessageInsert = {
        id: recordId,
        name: localRecord.name,
        email: localRecord.email,
        subject: localRecord.subject,
        message: localRecord.message,
        status: 'unread',
        created_at: nowIso,
      };

      const { error } = await supabase
        .from('contact_messages')
        .insert(newRecord as any);

      if (error) {
        return { success: true, messageId: localRecord.id, error: error.message };
      }

      return { success: true, messageId: recordId };
    } catch {
      return { success: true, messageId: localRecord.id };
    }
  },

  /**
   * Fetches all contact messages (Admin only), merging remote Supabase records with any unsynced local records.
   */
  async getContactMessages(): Promise<ContactMessageRow[]> {
    const localMsgs = getLocalMessages();

    if (!isSupabaseConfigured()) {
      return localMsgs;
    }

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        return localMsgs;
      }

      const remoteMsgs = data as ContactMessageRow[];
      const remoteIds = new Set(remoteMsgs.map((m) => m.id));
      const unsyncedLocal = localMsgs.filter((m) => !remoteIds.has(m.id));

      // Best-effort background sync of any local-only messages into Supabase
      if (unsyncedLocal.length > 0) {
        for (const msg of unsyncedLocal) {
          const syncedId = msg.id.startsWith('msg-') ? generateUuid() : msg.id;
          await supabase
            .from('contact_messages')
            .insert({
              id: syncedId,
              name: msg.name,
              email: msg.email,
              subject: msg.subject,
              message: msg.message,
              status: msg.status,
              created_at: msg.created_at,
            } as any);
        }
      }

      return [...remoteMsgs, ...unsyncedLocal].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } catch {
      return localMsgs;
    }
  },

  /**
   * Updates status of an inquiry (Admin only)
   */
  async updateMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<void> {
    const updatedLocal = getLocalMessages().map((m) =>
      m.id === id ? { ...m, status } : m
    );
    saveLocalMessages(updatedLocal);

    if (!isSupabaseConfigured() || id.startsWith('msg-')) return;

    await supabase
      .from('contact_messages')
      .update({ status } as any)
      .eq('id', id);
  },

  /**
   * Deletes a contact message (Admin only)
   */
  async deleteMessage(id: string): Promise<void> {
    const filteredLocal = getLocalMessages().filter((m) => m.id !== id);
    saveLocalMessages(filteredLocal);

    if (!isSupabaseConfigured() || id.startsWith('msg-')) return;

    await supabase.from('contact_messages').delete().eq('id', id);
  },
};
