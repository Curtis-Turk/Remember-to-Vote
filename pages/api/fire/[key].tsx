import { NextApiRequest, NextApiResponse } from 'next';

import sendElectionDayText, { sendElectionDayTextTest } from '../../../lib/sendElectionDayText';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (key === process.env.FIRE_TEST) {
    sendElectionDayTextTest();
    res.status(200).send('TEST FIRED! With key ' + key);
  }
  if (key === process.env.FIRE_KEY) {
    sendElectionDayText();
    res.status(200).send('SHOTS FIRED! With key ' + key);
  } else res.status(401).send('Your key:\n' + key + '\nis not correct');
}
