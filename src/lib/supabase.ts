import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Article = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export async function getRandomArticle(): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('RANDOM()')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}
