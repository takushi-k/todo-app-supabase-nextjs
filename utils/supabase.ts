import { createClient } from '@supabase/supabase-js'

console.log('supabase.ts called')

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
)
