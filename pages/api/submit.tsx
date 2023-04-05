import { NextApiRequest, NextApiResponse } from 'next';
import * as TwilioApi from '../../lib/twilioApi';
import { formData } from '../../src/components/Form';
import * as supabase from '../../lib/supabase';
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

export const sendConfirmationText = async (name: string, phone: string, messageType: string) => {
  const messageFunction =
    messageType === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;
  const body = `Hello ${name}, You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.`;
  return await messageFunction(body, phone);
};

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
  console.log(req.body);

  if (req.method == 'OPTIONS') {
    res.setHeader('Allow', 'POST');
    return res.status(202).json({});
  }

  const { name, phone, postcode, messageType, addressSlug } = req.body as formData;

  const result = await sendConfirmationText(name, phone, messageType);
  result ? res.status(201) : res.status(400);
  return res.end();
};
