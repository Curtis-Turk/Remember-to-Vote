import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const fromNumberWhatsapp = process.env.TWILIO_FROM_NUMBER_WHATSAPP as string;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID as string;
const testingServiceSid = process.env.TWILIO_TESTING_SERVICE_SID as string;
const client = new Twilio(accountSid, authToken);

interface createParams {
  body: string;
  to: string;
  from?: string;
  messagingServiceSid?: string;
}

const sendMessage = async (createParams: createParams): Promise<boolean> => {
  //catch testing
  if (createParams.to === '+15005550006') {
    createParams.messagingServiceSid = testingServiceSid;
  }
  // send message
  try {
    const message = await client.messages.create(createParams);
    console.log(`Message sent! SID: ${message.sid}`);
    return true;
  } catch (error) {
    console.log('Twilio Error ->', error);
    return false;
  }
};

export const sendSmsMessage = async (body: string, toNumber: string): Promise<boolean> => {
  return await sendMessage({
    body,
    messagingServiceSid: messagingServiceSid,
    to: `${toNumber}`,
  });
};

export const sendWhatsAppMessage = async (body: string, toNumber: string): Promise<boolean> => {
  return await sendMessage({
    body,
    from: `whatsapp:${fromNumberWhatsapp}`,
    to: `whatsapp:${toNumber}`,
  });
};
