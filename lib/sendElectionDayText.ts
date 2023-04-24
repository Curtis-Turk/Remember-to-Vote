// get all users from database
// Loop over users
//   check confirmation text sent
//      if true
//          check address slug
// if true
// use EC address slug endpoint
// else
// use EC postcode endpoint
// add returned polling station to message
// message user with name, postcode & polling station in correct message type

// return returns a list of error codes with user Ids

import { PostgrestError } from '@supabase/supabase-js';

interface userObject {
  id: number;
  created_at: Date;
  name: string;
  phone_number: string;
  address_slug: string;
  postcode: string;
  message_type: 'SMS' | 'WhatsApp';
  sent_confirmation_text: boolean;
}

interface supabaseResponse {
  error: PostgrestError | null;
  data: userObject[];
  count: number;
  status: number;
  statusText: string;
}

import { getAllUsers } from './supabase';
import ElectoralCommisionApi from './electoralCommisionApi';

export default async function sendElectionDayText() {
  const supabaseResponse: supabaseResponse = (await getAllUsers()) as supabaseResponse;
  const ECApi = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
  const users = supabaseResponse.data;

  for (const user of users) {
    if (user.sent_confirmation_text && user.address_slug === '') {
      console.log('logging postcode inside sendElectionDayText', user.postcode);

      const pollingStation = await ECApi.getPollingStationAddressInfo(user.postcode);
    }
  }
}
