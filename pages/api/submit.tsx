import { NextApiRequest, NextApiResponse } from 'next';
import * as TwilioApi from '../../lib/twilioApi';

export const sendConfirmationText = async (name: string, phone: string, messageType: string) => {
  const messageFunction =
    messageType === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;
  const body = `Hello ${name}, You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.`;
  return await messageFunction(body, phone);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  if (req.method == 'OPTIONS') {
    res.setHeader('Allow', 'POST');
    return res.status(202).json({});
  }

  const { name, phone, postcode, messageType } = req.body;

  const result = await sendConfirmationText(name, phone, messageType);
  result ? res.status(201) : res.status(400);
  return res.end();
};
