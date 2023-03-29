import { NextApiRequest, NextApiResponse } from 'next';
import ElectoralCommisionApi from '../../lib/electoralCommisionApi';

const electoralCommission = new ElectoralCommisionApi(process.env.EC_API_KEY as string);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
  //   return res.status(401);
  // }

  // if (req.method == 'OPTIONS') {
  //   res.setHeader('Allow', 'POST');
  //   return res.status(202).json({});
  // }

  // using EC API
  // const pollingStationResponse = await electoralCommission.verifyPostcode(
  //   req.body.postcode
  // );

  // demo response
  const pollingStationResponse = {
    pollingStationFound: true,
    pollingStations: [],
  };
  const statusCode = 200;

  // Live response information
  // const statusCode = pollingStationResponse.errorMessage ? 400 : 200;
  return res.status(statusCode).json(pollingStationResponse);
};
