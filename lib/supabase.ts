import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface formData {
  name: string;
  phone_number: string;
  postcode: string;
  address_slug: string;
  message_type: string;
  created_at: Date;
}

export const submitToVotersTable = async (formData: formData) => {
  const { data, error } = await supabase.from('voters').insert([formData]);
  return { data, error };
};
