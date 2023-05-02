import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

const supabaseDb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export interface voterTableRow {
  name: string;
  phone_number: string;
  postcode: string;
  address_slug: string;
  message_type: string;
  created_at: Date;
  sent_confirmation_text: boolean;
  sent_election_text: boolean;
}

/*returns the object:
{
  status: number, status code for request made to server
  statusText: string, description of status response (eg. "Created")
  data: object with requested data | null if no data requested
  error: object with error data | null if no error
  count: number of data objects | null if no number
}
*/

export const submitToVotersTable = async (
  voterTableRow: voterTableRow
): Promise<PostgrestSingleResponse<null>> => {
  const response = await supabaseDb.from('voters').insert([voterTableRow]);
  return response;
};

export const updateSentConfirmationTextField = async (
  phone_number: string
): Promise<PostgrestSingleResponse<null>> => {
  // updates filtering for phone_number as it a unique field
  const response = await supabaseDb
    .from('voters')
    .update({ sent_confirmation_text: true })
    .eq('phone_number', phone_number);
  return response;
};

export const updateSentElectionTextField = async (
  phone_number: string
): Promise<PostgrestSingleResponse<null>> => {
  // updates filtering for phone_number as it a unique field
  const response = await supabaseDb
    .from('voters')
    .update({ sent_election_text: true })
    .eq('phone_number', phone_number);
  return response;
};

export const getAllUsers = async () => {
  return await supabaseDb.from('voters').select();
};

export const deleteTestUser = async () => {
  return await supabaseDb.from('voters').delete().eq('phone_number', '+447813667642');
};
