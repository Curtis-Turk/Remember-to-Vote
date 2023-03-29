import { NextApiRequest, NextApiResponse } from 'next';
import TwilioApi from '../../lib/twilioApi';

const twilioApi = new TwilioApi(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string,
  process.env.TWILIO_FROM_NUMBER_WHATSAPP as string,
  process.env.TWILIO_MESSAGING_SERVICE_SID as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  if (req.method == 'OPTIONS') {
    res.setHeader('Allow', 'POST');
    return res.status(202).json({});
  }

  const { name, phone, postcode, messageType } = req.body;
  const messageFunction =
    messageType === 'Sms' ? twilioApi.sendSmsMessage : twilioApi.sendWhatsAppMessage;
  const body =
    "You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.";

  // Brought in for demo
  const result = await messageFunction(body, phone);

  // Stop twilio api call
  // const result = true;
  result ? res.status(201) : res.status(400);
  return res.end();
};
