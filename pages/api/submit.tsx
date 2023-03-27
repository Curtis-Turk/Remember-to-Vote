import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase";
import TwilioApi from "../../lib/twilioApi";

// const twilioApi = new TwilioApi("", "", "", "");
const twilioApi = new TwilioApi(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string,
  process.env.TWILIO_FROM_NUMBER_WHATSAPP as string,
  process.env.TWILIO_MESSAGING_SERVICE_SID as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
  //   return res.status(401);
  // }
  // await supabase.from("voters");

  const { name, phone } = req.body;
  const body = `Hi ${name},\n\nIt's election day! Your polling station:\n\nEarlswood Social Club,\n160-164 Greenway Road,\nRumney\n\nRemember to bring your ID`;
  const result = await twilioApi.sendSmsMessage(body, phone);

  return result ? res.status(201) : res.status(400);
};
