import { NextApiRequest, NextApiResponse } from 'next';

import sendElectionDayText, { sendElectionDayTextTest } from '../../../lib/sendElectionDayText';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  console.log('Getting to fire function');

  if (key === process.env.FIRE_TEST) {
    sendElectionDayTextTest();
    res.status(200).send('TEST FIRED! With TEST key ' + key);
  } else if (key === process.env.FIRE_KEY) {
    sendElectionDayText();
    res.status(200).send('SHOTS FIRED! With key ' + key);
  } else res.status(401).send('Your key:\n' + key + '\nis not correct');
}
