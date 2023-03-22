import { NextApiRequest, NextApiResponse } from "next";

export default (req: any, res: any) => {
  res.status(204).send("Pong");
};
