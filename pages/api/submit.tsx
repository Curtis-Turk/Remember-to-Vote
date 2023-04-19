import { NextApiRequest, NextApiResponse } from 'next';
import * as TwilioApi from '../../lib/twilioApi';
import { formData } from '../../src/components/Form';
import * as supabase from '../../lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const sendConfirmationText = async (
  name: string,
  phone: string,
  messageType: string
): Promise<boolean> => {
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
    sent_confirmation_text: false,
  };
  return await supabase.submitToVotersTable(voterTableRow);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, phone, postcode, messageType, addressSlug } = req.body as formData;
  console.log(req.body);
  res.status(201);

  // return res.end();
  // insert formData into Supabase table as new row
  const supabaseResponse: PostgrestSingleResponse<null> = await submitToSupabase(
    name,
    phone,
    messageType,
    addressSlug,
    postcode
  );
  // default success status
  let status = 201;

  if (supabaseResponse.error !== null) {
    /* '23505' is a unique violation in PostGres (field must be unique)
    This will only happen if a voter's phone number is already in the database
    Status: 400 - something went wrong / 409 - unique conflict
    */
    const uniqueConstraintErrorCode = '23505';
    status = supabaseResponse.error!.code === uniqueConstraintErrorCode ? 409 : 400;
  } else {
    // if supabase did not throw an error, send a confirmation text using Twilio
    const isConfirmationTextSent: boolean = await sendConfirmationText(name, phone, messageType);
    // resolves to false if there is an error sending the text (eg connection to Twilio)
    if (isConfirmationTextSent === true) supabase.updateSentConfirmationTextField(phone);
  }

  res.status(status);

  return res.end();
}
