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

interface pollingStationRequest {
  postcode: string;
  address_slug: string;
}

const messageBody = (name: string, postcode: string, pollingStation: string) =>
  `Hello ${name},\n\n 🗳️ It's election day! 🗳️\n\nThe polling station for your postcode ${postcode} is:\n\n${pollingStation}\n\nRemember to bring your ID.`;

import { getAllUsers } from './supabase';
import ElectoralCommisionApi from './electoralCommisionApi';

export default async function sendElectionDayText() {
  const supabaseResponse: supabaseResponse = (await getAllUsers()) as supabaseResponse;
  const ECApi = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
  const users = supabaseResponse.data;

  let request: pollingStationRequest;

  for (const user of users) {
    if (user.sent_confirmation_text) {
      request = { postcode: user.postcode, address_slug: user.address_slug };

      const pollingStationResponse = await ECApi.getPollingStation(request);
      console.log(
        '🚀 ~ file: sendElectionDayText.ts:59 ~ sendElectionDayText ~ pollingStationResponse:',
        pollingStationResponse
      );
      const pollingStation = `${pollingStationResponse?.address} ${pollingStationResponse?.postcode}`;

      const message = messageBody(user.name, user.postcode, pollingStation);
      // console.log('🚀 ~ file: sendElectionDayText.ts:60 ~ sendElectionDayText ~ message:', message);
    }
  }
}
