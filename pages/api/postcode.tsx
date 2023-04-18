import { NextApiRequest, NextApiResponse } from 'next';
import ElectoralCommisionApi from '../../lib/electoralCommisionApi';

const electoralCommission = new ElectoralCommisionApi(process.env.EC_API_KEY as string);

// Demo responses

// const pollingStationResponse = {
//   pollingStationFound: true,
//   pollingStations: [],
// };
// const pollingStationResponse = {
//   pollingStationFound: false,
//   pollingStations: [
//     {
//       address: '16 DUNCAN CLOSE, ST. MELLONS, CARDIFF',
//       postcode: 'CF3 1NP',
//       slug: '100100106448',
//       url: 'http://developers.democracyclub.org.uk/api/v1address/100100106448',
//     },
//     {
//       address: '26 DUNCAN CLOSE, ST. MELLONS, CARDIFF',
//       postcode: 'CF3 1NP',
//       slug: '100100106458',
//       url: 'http://developers.democracyclub.org.uk/api/v1address/100100106458',
//     },
//   ],
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.headers.origin !== process.env.NEXT_PUBLIC_API) {
  //   return res.status(401);
  // }

  const pollingStationResponse = await electoralCommission.verifyPostcode(req.body.postcode);
  // console.log('🚀 ~ file: postcode.tsx:36 ~ pollingStationResponse:', pollingStationResponse);

  // const pollingStationResponse = {
  //   errorMessage: 'Could not geocode from any source',
  //   pollingStationFound: false,
  //   pollingStations: [],
  // };

  // const pollingStationResponse = {
  //   pollingStationFound: false,
  //   pollingStations: [
  //     {
  //       address: '16 DUNCAN CLOSE, ST. MELLONS, CARDIFF',
  //       postcode: 'CF3 1NP',
  //       slug: '100100106448',
  //       url: 'http://developers.democracyclub.org.uk/api/v1address/100100106448',
  //     },
  //     {
  //       address: '26 DUNCAN CLOSE, ST. MELLONS, CARDIFF',
  //       postcode: 'CF3 1NP',
  //       slug: '100100106458',
  //       url: 'http://developers.democracyclub.org.uk/api/v1address/100100106458',
  //     },
  //   ],
  // };

  const statusCode = pollingStationResponse.errorMessage ? 400 : 200;
  return res.status(statusCode).json(pollingStationResponse);
}
