import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://wqqcenttsrbcawxfuenu.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_Gq_Vm4rNOQ89pswJdEYjZw_25bBVxyl";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export async function getLogs() {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function addLog(log: any) {
  const { error } = await supabase
    .from("logs")
    .insert([log]);

  if (error) {
    console.error(error);
  }
}

export async function saveLogs(logs: any[]) {
  const { error } = await supabase
    .from("logs")
    .insert(logs);

  if (error) {
    console.error(error);
  }
}
