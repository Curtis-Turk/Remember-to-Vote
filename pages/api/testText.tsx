import { NextApiRequest, NextApiResponse } from 'next';
import * as TwilioApi from '../../lib/twilioApi';

const sendTestText = async (name: string, phone: string, messageType: string): Promise<boolean> => {
  const messageFunction =
    messageType === 'Sms' ? TwilioApi.sendSmsMessage : TwilioApi.sendWhatsAppMessage;
  const body = `cron test`;
  return await messageFunction(body, phone);
};

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log('This is a cron firing from textTest');
  // when we have name number
  sendTestText('Curtis', '+447436468661', 'Sms');
}
