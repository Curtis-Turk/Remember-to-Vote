import { getAllUsers, updateSentElectionTextField } from './supabase';
import ElectoralCommisionApi from './electoralCommisionApi';
import * as TwilioApi from '../lib/twilioApi';
import { PostgrestError } from '@supabase/supabase-js';
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

interface userObject {
  id: number;
  created_at: Date;
  name: string;
  phone_number: string;
  address_slug: string;
  postcode: string;
  message_type: 'Sms' | 'WhatsApp';
  sent_confirmation_text: boolean;
  sent_election_text: boolean;
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

let remainingAttempts: number = 3;

async function trySendingAgain() {
  if (remainingAttempts !== 0) {
    await sendElectionDayText();
    remainingAttempts -= 1;
  }
}

export default async function sendElectionDayText() {
  const supabaseResponse: supabaseResponse = (await getAllUsers()) as supabaseResponse;
  const ECApi = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
  const users = supabaseResponse.data;

  let request: pollingStationRequest;

  for (const user of users) {
    if (user.sent_confirmation_text && !user.sent_election_text) {
      request = { postcode: user.postcode, address_slug: user.address_slug };

      const pollingStationResponse = await ECApi.getPollingStation(request);

      const pollingStation = `${pollingStationResponse?.address} ${pollingStationResponse?.postcode}`;

      const message = messageBody(user.name, user.postcode, pollingStation);

      const messageFunction =
        user.message_type === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;

      const twilioResult = await messageFunction(message, user.phone_number);

      if (twilioResult === true) await updateSentElectionTextField(user.phone_number);

      setTimeout(trySendingAgain, 10 * 60 * 1000);
    }
  }
}

let remainingTestAttempts: number = 3;

async function trySendingAgainTest() {
  if (remainingTestAttempts !== 0) {
    await sendElectionDayTextTest();
    remainingAttempts -= 1;
  }
}

export async function sendElectionDayTextTest() {
  const supabaseResponse: supabaseResponse = (await getAllUsers()) as supabaseResponse;
  const ECApi = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
  const users = supabaseResponse.data;

  let request: pollingStationRequest;

  for (const user of users) {
    if (user.sent_confirmation_text && user.phone_number == '+447813667642') {
      request = { postcode: user.postcode, address_slug: user.address_slug };

      const pollingStationResponse = await ECApi.getPollingStation(request);

      const pollingStation = `${pollingStationResponse?.address} ${pollingStationResponse?.postcode}`;

      const message = messageBody(user.name, user.postcode, pollingStation);

      const messageFunction =
        user.message_type === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;

      const twilioResult = await messageFunction(message, user.phone_number);

      if (twilioResult === true) await updateSentElectionTextField(user.phone_number);

      setTimeout(trySendingAgainTest, 30 * 1000);
    }
    console.log(user);
  }
}
