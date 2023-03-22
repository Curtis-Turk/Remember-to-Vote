import { NextApiRequest, NextApiResponse } from "next";
import ElectoralCommisionApi from "../../lib/electoralCommisionApi";

const electoralCommission = new ElectoralCommisionApi(
  process.env.EC_API_KEY as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.origin !== process.env.FRONT_END_DOMAIN) {
    return res.status(400);
  }

  const pollingStationResponse = await electoralCommission.verifyPostcode(
    req.body.postcode
  );
  const statusCode = pollingStationResponse.errorMessage ? 400 : 200;
  // return res.status(statusCode).json({
  //   errorMessage: "Connection issue whilst verifying postcode",
  //   pollingStationFound: false,
  //   pollingStations: [],
  // });
  return res.status(statusCode).json(pollingStationResponse);
};
