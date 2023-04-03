import { NextApiRequest, NextApiResponse } from 'next';
import TwilioApi from '../../lib/twilioApi';

const twilioApi = new TwilioApi(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string,
  process.env.TWILIO_FROM_NUMBER_WHATSAPP as string,
  process.env.TWILIO_MESSAGING_SERVICE_SID as string
);

const createMessageBody = (name: string) =>
  `Hello ${name}, You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.`;

export const sendConfirmationText = async (name: string, phone: string, messageType: string) => {
  const messageFunction =
    messageType === 'Sms' ? twilioApi.sendSmsMessage : twilioApi.sendWhatsAppMessage;
  const body = createMessageBody(name);

  // Brought in for demo
  return await messageFunction(body, phone);

  // Stop twilio api call
  // return true;
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
