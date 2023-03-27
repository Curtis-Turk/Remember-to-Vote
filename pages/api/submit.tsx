import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
  //   return res.status(401);
  // }
  // await supabase.from("voters");
};
