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

/*
returns the object:
{
  status: number, status code for request made to server
  statusText: string, description of status response (eg. "Created")
  data: object with requested data | null if no data requested
  error: object with error data | null if no error
  count: number of data objects | null if no number
}
*/
export const submitToVotersTable = async (formData: formData) => {
  const response = await supabase.from('voters').insert([formData]);
  return response;
};
