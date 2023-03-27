import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("🚀 ~ file: submit.tsx:5 ~ req:", req.body);
  if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
    return res.status(401);
  }
  // return res.status(200).send({})
  // await supabase.from("voters");
};
