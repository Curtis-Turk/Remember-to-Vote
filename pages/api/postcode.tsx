import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import ElectoralCommisionApi from '../../lib/electoralCommisionApi';

const electoralCommission = new ElectoralCommisionApi(process.env.EC_API_KEY as string);
const cors = Cors({
  methods: ['GET'],
  origin: 'react-polling-front-end-git-development-curtis-turk.vercel.app',
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

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
