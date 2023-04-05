import { NextApiRequest, NextApiResponse } from 'next';
import * as TwilioApi from '../../lib/twilioApi';
import { formData } from '../../src/components/Form';
import * as supabase from '../../lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const sendConfirmationText = async (name: string, phone: string, messageType: string) => {
  const messageFunction =
    messageType === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;
  const body = `Hello ${name}, You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.`;
  return await messageFunction(body, phone);
};

/* converts formData to a voterTableRow object and then submits it to supabase
returns the object:
  {
    status: number, status code for request made to server
    statusText: string, description of status response (eg. "Created")
    data: object with requested data | null if no data requested
    error: object with error data | null if no error
    count: number of data objects | null if no number
  } */
export const submitToSupabase = async (
  name: string,
  phone: string,
  messageType: string,
  addressSlug: string,
  postcode: string
): Promise<PostgrestSingleResponse<null>> => {
  const voterTableRow: supabase.voterTableRow = {
    name,
    phone_number: phone,
    message_type: messageType,
    address_slug: addressSlug,
    postcode,
    created_at: new Date(),
  };
  return await supabase.submitToVotersTable(voterTableRow);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, phone, postcode, messageType, addressSlug } = req.body as formData;

  const supabaseResponse = await submitToSupabase(name, phone, messageType, addressSlug, postcode);
  if (supabaseResponse.error !== null) {
    res.status(400);
    return res.end();
  }
  // get a response from Supabase, successful?
  /*
  response if phone number already exists
  response if connection error "Something went wrong" 400 status
  */
  const result = await sendConfirmationText(name, phone, messageType);
  // interact with Twilio, successful?
  /*
  if error, do something

  if phone number bounces?
  does twilio know if a phone number? test with phone number that doesnt exist?
  should do something if phone number is wrong

  should do something if it fails to send "Something went wrong" 400 status

  if twilio error, remove user
  */

  // deleteFromSupabase
  // should this change a VerifiedTextSent field?
  result ? res.status(201) : res.status(400);
  return res.end();
};
