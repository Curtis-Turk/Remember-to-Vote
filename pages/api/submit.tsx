import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase";
import TwilioApi from "../../lib/twilioApi";

const twilioApi = new TwilioApi("", "", "", "");
// const twilioApi = new TwilioApi(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN,
//   process.env.TWILIO_FROM_NUMBER_WHATSAPP,
//   process.env.TWILIO_MESSAGING_SERVICE_SID
// );

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
  //   return res.status(401);
  // }
  // await supabase.from("voters");
  const result = await twilioApi.sendMessage({ body: "body", to: "to" });
  console.log(result);
};
