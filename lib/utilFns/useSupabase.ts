import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANONYMOUS_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anonymous Key is undefined");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const addAccountToWhitelist = async (accountId: string) => {
  const { data, error } = await supabase
    .from("whitelist")
    .insert([{ account_id: accountId }]);

  if (error) throw error;
  return data;
};

const removeAccountFromWhitelist = async (accountId: string) => {
  const { data, error } = await supabase
    .from("whitelist")
    .delete()
    .match({ account_id: accountId });

  if (error) throw error;
  return data;
};
