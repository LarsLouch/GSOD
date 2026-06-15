import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project credentials
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY || '';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
