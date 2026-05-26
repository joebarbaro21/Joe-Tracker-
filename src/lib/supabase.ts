import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wqqcenttsrbcawxfuenu.supabase.co'

const supabaseKey =
  'sb_publishable_Gq_Vm4rNOQ89pswJdEYjZw_25bBVxyl'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
