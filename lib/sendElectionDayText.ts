import { getAllUsers, updateSentElectionTextField } from './supabase';
import ElectoralCommisionApi from './electoralCommisionApi';
import * as TwilioApi from '../lib/twilioApi';
import { PostgrestError } from '@supabase/supabase-js';

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

const messageBody = (name: string, postcode: string, pollingStation: string) => {
  if (pollingStation === ' ') {
    return `Hello ${name},\n\n 🗳️ It's election day! 🗳️\n\nUnfortunately the Electoral Commission service hasn't been updated with your polling station. They recommend you visit https://whocanivotefor.co.uk/elections/${postcode}/#where for instructions.\n\nRemember, you will need photo ID to vote.`;
  } else
    return `Hello ${name},\n\n 🗳️ It's election day! 🗳️\n\nThe polling station for your postcode ${postcode} is:\n\n${pollingStation}\n\nRemember, you will need to bring photo ID.`;
};

let remainingAttempts: number = 2;

async function trySendingAgain() {
  if (remainingAttempts >= 0) {
    remainingAttempts -= 1;
    await sendElectionDayText();
    return;
  }
}

export default async function sendElectionDayText() {
  const supabaseResponse: supabaseResponse = (await getAllUsers()) as supabaseResponse;
  const ECApi = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
  const users = supabaseResponse.data;
  console.log('🚀 ~ file: sendElectionDayText.ts:52 ~ sendElectionDayText ~ users:', users);

  let request: pollingStationRequest;

  for (const user of users) {
    console.log(user);

    if (user.sent_confirmation_text && user.sent_election_text === false) {
      console.log('Sending text');

      const strippedPostcode = user.postcode.replace(' ', '');

      request = { postcode: strippedPostcode, address_slug: user.address_slug };

      const pollingStationResponse = await ECApi.getPollingStation(request);

      const pollingStation = `${pollingStationResponse?.address} ${pollingStationResponse?.postcode}`;

      const message = messageBody(user.name, user.postcode, pollingStation);

      const messageFunction =
        user.message_type === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;

      const twilioResult = await messageFunction(message, user.phone_number);

      if (twilioResult === true) await updateSentElectionTextField(user.phone_number);

      setTimeout(trySendingAgain, 60 * 1000);
    }
  }
}

let testRemainingAttempts: number = 2;

async function trySendingAgainTest() {
  if (testRemainingAttempts >= 0) {
    testRemainingAttempts -= 1;
    await testSendElectionDayText();
    return;
  }
}

export async function testSendElectionDayText() {
  const supabaseResponse: supabaseResponse = (await getAllUsers()) as supabaseResponse;
  const ECApi = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
  const users = supabaseResponse.data;

  let request: pollingStationRequest;

  for (const user of users) {
    if (
      user.sent_confirmation_text &&
      user.phone_number == '+447813667642' &&
      !user.sent_election_text
    ) {
      const strippedPostcode = user.postcode.replace(' ', '');

      request = { postcode: strippedPostcode, address_slug: user.address_slug };

      const pollingStationResponse = await ECApi.getPollingStation(request);

      const pollingStation = `${pollingStationResponse?.address} ${pollingStationResponse?.postcode}`;

      const message = messageBody(user.name, user.postcode, pollingStation);

      const messageFunction =
        user.message_type === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;

      const twilioResult = await messageFunction(message, user.phone_number);

      if (twilioResult === true) await updateSentElectionTextField(user.phone_number);

      setTimeout(trySendingAgainTest, 1 * 1000);
    }
  }
}
