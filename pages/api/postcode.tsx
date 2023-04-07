import { NextApiRequest, NextApiResponse } from 'next';
import ElectoralCommisionApi from '../../lib/electoralCommisionApi';

const electoralCommission = new ElectoralCommisionApi(process.env.EC_API_KEY as string);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
  //   return res.status(401);
  // }

  // using EC API
  // const pollingStationResponse = await electoralCommission.verifyPostcode(
  //   req.body.postcode
  // );
  const pollingStationResponse = {
    pollingStationFound: true,
    pollingStations: [
      {
        address: '16 DUNCAN CLOSE, ST. MELLONS, CARDIFF',
        postcode: 'CF3 1NP',
        slug: '100100106448',
        url: 'http://developers.democracyclub.org.uk/api/v1address/100100106448',
      },
      {
        address: '26 DUNCAN CLOSE, ST. MELLONS, CARDIFF',
        postcode: 'CF3 1NP',
        slug: '100100106458',
        url: 'http://developers.democracyclub.org.uk/api/v1address/100100106458',
      },
    ],
  };
  // demo response
  // const pollingStationResponse = {
  //   pollingStationFound: true,
  //   pollingStations: [],
  // };
  const statusCode = 200;

  // Live response information
  // const statusCode = pollingStationResponse.errorMessage ? 400 : 200;
  return res.status(statusCode).json(pollingStationResponse);
};
