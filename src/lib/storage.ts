import { supabase } from './supabase';

// Interfaces (Keep these for type safety)
export interface Group {
    id: string;
    name: string;
    code: string;
    members: string[]; // JSONB or Array type in Supabase
    created_at?: string;
    status: 'pending' | 'active';
    goal?: string;
    deadline?: string;
    weekly_progress?: Record<string, { verified: boolean; last_seen: string }>; // Track per member
}

// API Wrapper utilizing Supabase
export const db = {
    groups: {
        create: async (name: string) => {
            // Generate a unique 4 digit code (simple random for now)
            const code = Math.floor(1000 + Math.random() * 9000).toString();

            const { data, error } = await supabase
                .from('groups')
                .insert({
                    name,
                    code,
                    members: [],
                    status: 'pending'
                })
                .select()
                .single();

            if (error) {
                console.error("Supabase Create Error:", error);
                throw error;
            }
            return data as Group;
        },

        findByCode: async (code: string) => {
            const { data, error } = await supabase
                .from('groups')
                .select('*')
                .eq('code', code)
                .maybeSingle();

            return data as Group | null;
        },

        findByMember: async (phone: string) => {
            // Search in the members JSONB array
            const { data, error } = await supabase
                .from('groups')
                .select('*')
                .contains('members', [phone])
                .maybeSingle();

            if (error) console.error("findByMember Error:", error);
            return data as Group | null;
        },

        list: async () => {
            const { data, error } = await supabase
                .from('groups')
                .select('*');

            if (error) console.error(error);
            return (data || []) as Group[];
        },

        update: async (id: string, updates: Partial<Group>) => {
            const { data, error } = await supabase
                .from('groups')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) console.error("Update Error:", error);
            return data as Group | null;
        }
    }
};
