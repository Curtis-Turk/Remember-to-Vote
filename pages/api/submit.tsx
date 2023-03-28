import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase";
import TwilioApi from "../../lib/twilioApi";

const twilioApi = new TwilioApi(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string,
  process.env.TWILIO_FROM_NUMBER_WHATSAPP as string,
  process.env.TWILIO_MESSAGING_SERVICE_SID as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { name, phone, postcode, messageType } = req.body;
  const messageFunction =
    messageType === "Sms"
      ? twilioApi.sendSmsMessage
      : twilioApi.sendWhatsAppMessage;
  const body = `DemoText:\n\nHi ${name},\n\nIt's election day!🗳️ Your polling station:\n\nEarlswood Social Club,\n160-164 Greenway Road,\nRumney\n\nRemember to bring your ID`;

  // Brought in for demo
  const result = await messageFunction(body, phone);

  // Stop twilio api call
  // const result = true;
  result ? res.status(201) : res.status(400);
  return res.end();
};
